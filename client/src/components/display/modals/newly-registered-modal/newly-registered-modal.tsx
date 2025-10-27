import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Mail } from "lucide-react";

interface NewlyRegisteredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
}

export const NewlyRegisteredModal = ({
  isOpen,
  onClose,
  onSignUp,
}: NewlyRegisteredModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl  text-gray-900 font-display">
            Welcome to On The Record!
          </h2>

          <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800">
                Special Offer
              </span>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Users who sign up receive a{" "}
              <span className="font-bold text-indigo-600">10% off</span> code in
              their email to use on their first purchase!
            </p>
          </div>

          <p className="text-gray-600">
            Create your account to unlock exclusive discounts and track your
            orders.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            onClick={onSignUp}
            className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Up & Get 10% Off
          </Button>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full h-10 text-gray-600 hover:text-gray-800"
          >
            Continue as Guest
          </Button>
        </div>

        <p className="text-xs text-gray-500 pt-2">
          You can always sign up later to access your order history and
          exclusive offers.
        </p>
      </div>
    </Modal>
  );
};
