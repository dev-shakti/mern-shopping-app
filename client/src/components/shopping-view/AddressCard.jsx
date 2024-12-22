import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  currentSelectedAddress,
  setCurrentSelectedAddress,
}) => {
  return (
    <Card
    className={`${
      currentSelectedAddress?._id === addressInfo?._id
        ? "border-red-900 border-[4px]"
        : "border-black"
    } shadow-lg rounded-lg p-4 bg-white`}
    onClick={() =>
      setCurrentSelectedAddress
        ? setCurrentSelectedAddress(addressInfo)
        : null
    }
    >
      <CardContent className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Address Details</h2>
        <p className="text-sm text-gray-600">
          <strong>Address:</strong> {addressInfo?.address}
        </p>
        <p className="text-sm text-gray-600">
          <strong>City:</strong> {addressInfo?.city}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Pincode:</strong> {addressInfo?.pincode}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Phone:</strong> {addressInfo?.phone}
        </p>
        {addressInfo?.notes && (
          <p className="text-sm text-gray-600">
            <strong>Notes:</strong> {addressInfo?.notes}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 mt-4">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="px-4 py-2 bg-[#2ecc71] text-white rounded hover:bg-[#27ae60]"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="px-4 py-2 bg-[#e74c3c] text-white rounded hover:bg-[#c0392b]"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
