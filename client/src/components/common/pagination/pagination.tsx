import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

type CommonPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const CommonPagination: FC<CommonPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={`w-full max-w-xs ${className || ""}`}>
      <Pagination className="w-full">
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              isActive={currentPage === 1}
              className="bg-white text-black border px-2 py-1 rounded transition-colors hover:bg-gray-100"
            />
          </PaginationItem>

          <PaginationItem>
            <span className="text-sm text-black">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              isActive={currentPage === totalPages}
              className="bg-white text-black border px-2 py-1 rounded transition-colors hover:bg-gray-100"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
