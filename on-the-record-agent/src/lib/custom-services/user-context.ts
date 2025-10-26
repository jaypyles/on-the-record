import { SQLiteDB } from "./database";

export async function getUserContext(callerPhoneNumber: string) {
  const database = new SQLiteDB();
  await database.connect();

  const user = await database.get<{ id: string; name: string; email: string }>(
    "SELECT * FROM users WHERE phone = ?",
    [callerPhoneNumber]
  );

  let extraContext = "";

  if (!user) {
    return extraContext;
  }

  const orders = await database.all<{
    id: string;
    items: string;
    total: number;
    created_at: string;
  }>(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 3",
    [user.id]
  );

  const ordersText = [];

  for (let idx = 0; idx < orders.length; idx++) {
    const order = orders[idx];

    const parsedItems: { id: number; quantity: number }[] = JSON.parse(
      order.items
    );
    const itemIds = parsedItems.map((i) => i.id);

    let itemsInfo: {
      band_item_id: number;
      band_name: string;
      title: string;
      price: number;
    }[] = [];

    if (itemIds.length > 0) {
      const placeholders = itemIds.map(() => "?").join(",");
      itemsInfo = await database.all(
        `SELECT id AS band_item_id, band as band_name, title, price
   FROM band_items
   WHERE id IN (${placeholders})`,
        itemIds
      );
    }

    const itemLines = parsedItems
      .map((i) => {
        const info = itemsInfo.find((x) => x.band_item_id === i.id);
        if (!info) return `- Item ID: ${i.id} (Qty: ${i.quantity})`;
        return `- ${info.band_name} - ${info.title} ($${info.price}) x${i.quantity}`;
      })
      .join("\n");

    ordersText.push(`
[Order ${idx + 1}] Total: $${order.total.toFixed(2)}
Date: ${order.created_at}
Items:
${itemLines}
`);
  }

  extraContext = `
------ THE USER THAT IS CALLING'S DATA -------
User Name: ${user.name}
User Email: ${user.email}

Recent Orders (${orders.length}):
${ordersText.join("\n")}
`;

  console.log({ extraContext });

  await database.close();
  return extraContext;
}
