import { useToast } from "@chakra-ui/react"
const UseToast = () => {
     const toast = useToast()
     return ({ title, status }) => {
          toast({
               title: `${title}`,
               status: `${status}`,
               position: 'top',
               duration: 4000
          });
     }
}
export default UseToast