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
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/redux/admin/productSlice";
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
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...formData, image: uploadedImageUrl };

    selectedItemId !== null
      ? dispatch(editProduct({ formData, id: selectedItemId }))
          .then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialState);
              setOpenCreateProductsDialog(false);
              setSelectedItemId(null);
              toast.success(data.payload.message);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(
              error?.payload?.message ||
                error?.message ||
                "Something went wrong!"
            );
          })
      : dispatch(addNewProduct({ ...updatedData }))
          .then((data) => {
            if (data?.payload?.success) {
              console.log(data.payload)
              dispatch(fetchAllProducts());
              setOpenCreateProductsDialog(false);
              setImageFile(null);
              setFormData(initialState);
              toast.success(data.payload.message);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(
              error?.payload?.message ||
                error?.message ||
                "Something went wrong!"
            );
          });
  };

  function handleDelete(id) {
    dispatch(deleteProduct(id))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          toast.success(data.payload.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error?.payload?.message || error?.message || "Something went wrong!"
        );
      });
  }

 console.log(openCreateProductsDialog,imageFile,selectedItemId)
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button className="bg-orange-400 hover:bg-orange-500" onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                handleDelete={handleDelete}
                setSelectedItemId={setSelectedItemId}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setSelectedItemId(null);
          setFormData(initialState);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedItemId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
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
              buttonText={selectedItemId ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
