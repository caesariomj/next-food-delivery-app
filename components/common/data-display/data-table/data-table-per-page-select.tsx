import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGINATION_PER_PAGE_OPTIONS } from "@/lib/constants/pagination";
import { cn } from "@/lib/utils/cn";

type DataTablePerPageSelectProps = {
  perPage: string;
  onPerPageChangeAction: (value: string) => void;
  className?: string;
};

export default function DataTablePerPageSelect({
  perPage,
  onPerPageChangeAction,
  className,
}: DataTablePerPageSelectProps) {
  return (
    <div className={cn("flex w-full items-center gap-4", className)}>
      <span className="text-base font-medium tracking-tight text-foreground">
        Per-page:
      </span>
      <Select value={perPage} onValueChange={onPerPageChangeAction}>
        <SelectTrigger className="w-full max-w-16">
          <SelectValue placeholder={perPage} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Per-page</SelectLabel>
            {PAGINATION_PER_PAGE_OPTIONS.map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
