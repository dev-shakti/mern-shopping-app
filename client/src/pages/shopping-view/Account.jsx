import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShoppingOrders from "../../components/shopping-view/ShoppingOrders"
import Address from "../../components/shopping-view/Address"


const ShopingAccount = () => {
  return (
    <div className="flex flex-col">
         <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/1447860506/photo/portrait-of-happy-indian-family-wearing-casual-cloths-holding-shopping-bags-and-celebration.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y44d12OG8zXCe1n-r7NdEO0XcAFpwPBafyCYu6uxbbQ="
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto py-8 grid grid-cols-1">
        <div className="bg-background rounded-lg p-6 shadow-sm border ">
        <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShopingAccount
