import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilters }) => {
  return (
    <div className="w-64  rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="flex flex-col space-y-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilters(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
              <Separator className="mt-2" />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
