import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const forminput = () => {
  return (
    <div className="mb-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input name="firstName" type="text"/>
                </div>
  )
}
export default forminput