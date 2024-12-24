import { useSelector } from "react-redux";
import RezTest from "../../modules/RezTest/RezTest";
import TestPageModule from "../../modules/TestPageModule/TestPageModule";

function TestCours() {
    const store = useSelector((state) => state.isTestSlice);
    return ( 
        <>  {!store?.completeTest ? <TestPageModule/> : <RezTest/>}
        </>
     );
}

export default TestCours;