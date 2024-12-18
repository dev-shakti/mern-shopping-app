import { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import AddressCard from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAllAddress,
  updateAddress,
} from "@/redux/shop/addressSlice";
import { toast } from "sonner";
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { user } = useSelector((state) => state.auth);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const dispatch = useDispatch();
  const { addressList } = useSelector((state) => state.address);

  const handleManageAddress = async (e) => {
    e.preventDefault();

    if(addressList.length>=3 && selectedAddressId===null){
      setFormData(initialAddressFormData)
      toast.error("you can add maximum 3 address")
      return;
    }

    if (selectedAddressId !== null) {
      dispatch(
        updateAddress({
          userId: user?.id,
          addressId: selectedAddressId,
          formData,
        })
      )
        .then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setSelectedAddressId(null);
            toast.success(data.payload.message);
            setFormData(initialAddressFormData);
          }
        })
        .catch((error) => {
          console.error(error.response?.data || error.message);
          toast.error(error?.payload?.message || error?.message);
        });
    } else {
      dispatch(addAddress({ ...formData, userId: user?.id }))
        .then((data) => {
          if (data?.payload?.success) {
            console.log(data);
            dispatch(fetchAllAddress(user?.id));
            toast.success(data.payload.message);
            setFormData(initialAddressFormData);
          }
        })
        .catch((error) => {
          console.error(error.response?.data || error.message);
          toast.error(error?.payload?.message || error?.message);
        });
    }
  };

  const handleDeleteAddress = (addressInfo) => {
    dispatch(deleteAddress({ userId: user?.id, addressId: addressInfo._id }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
          toast.success(data.payload.message);
        }
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
        toast.error(error?.payload?.message || error?.message);
      });
  };

  const handleEditAddress = (addressInfo) => {
    setSelectedAddressId(addressInfo?._id);
    setFormData({
      address: addressInfo?.address || "",
      city: addressInfo?.city || "",
      phone: addressInfo?.phone || "",
      pincode: addressInfo?.pincode || "",
      notes: addressInfo?.notes || "",
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch, user?.id]);

  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 p-4">
        {addressList && addressList.length > 0
          ? addressList.map((address) => (
              <AddressCard
                key={address._id}
                addressInfo={address}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {selectedAddressId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={selectedAddressId ? "Edit Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
