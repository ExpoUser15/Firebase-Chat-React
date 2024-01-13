import Input from "./Input";
import Label from "./Label";
import Button from "../Button/Button";

function Index(props) {
    const { event, func, id } = props;
    
    return (
        <div>
            <Label />
            <div className="flex flex-col">
                <Input eventFunction={func} id={id} classname={"rounded-md outline-none text-sm my-3 text-black p-2"} placeholder={'username'}/>
                <Button eventFunction={event} classname="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md p-2 hover:bg-gradient-to-l ease-in">Sign Up</Button>
            </div>
        </div>
    )
}

export default Index