import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/categories";

const CategoryInput = ({defaultValue}:{defaultValue?:string}) => {
  const name = "caregory";

  return (
    <div className="mb-2">
      <Label htmlFor={name}>{name}</Label>

      <Select
      defaultValue={defaultValue }
      name={name}
      required
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue  />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                <span className="capitalize flex items-center gap-4">
                    <item.icon />
                    {item.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryInput;
