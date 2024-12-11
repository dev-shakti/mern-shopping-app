import ProductCard from "@/components/admin/ProductCard";
import ProductImageUpload from "@/components/admin/ProductImageUpload";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, fetchAllProducts } from "@/redux/admin/productSlice";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {productList}=useSelector((state) => state.adminProducts)
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = { ...formData, image: uploadedImageUrl };
    dispatch(addNewProduct({...updatedData}))
      .then((data) => {
        if(data.payload.success){
          dispatch(fetchAllProducts())
          setFormData(initialState)
          setOpenCreateProductsDialog(false)
          toast.success(data.payload.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error?.payload?.message || error?.message || "Something went wrong!"
        );
      });
  };

  useEffect(() => {
    dispatch(fetchAllProducts())
  },[dispatch])

  useEffect(() => {
    console.log(productList)
  },[productList])

 
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-col-3 lg:grid-cols-4">
        {productList && productList.length>0 ?
         (productList.map((product) => (
          <ProductCard product={product} key={product._id}/>
         )))
        : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={"Add Products"}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
