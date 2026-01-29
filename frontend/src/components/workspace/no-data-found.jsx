import { CirclePlus, LayoutGrid } from 'lucide-react'
import { Button } from '../ui/button'

const NoDataFound = ({ title , description, buttonText, buttonAction }) => {
    return (
        <div className="col-span-full text-center py-12 2xl:py-24 bg-muted/40 rounded-lg">
            <LayoutGrid className="size-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
            <Button className="mt-4" onClick={buttonAction}>
                <CirclePlus className="size-4 mr-2" />
                {buttonText}
            </Button>
        </div>
    )
}

export default NoDataFound
