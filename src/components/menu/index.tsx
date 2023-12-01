import { Button, Modal } from "antd";
import IMenu from "./IMenu.model";
import { useAppDispatch } from "../../hooks/stateHooks";
import { clearData } from "../../store/global/globalSlice";

const Menu: React.FC<IMenu> = (params) => {

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(clearData());
        params.openCallback(false);
    }

    return (
        <Modal title="Menu" footer={null} open={params.isOpen} onCancel={() => params.openCallback(false)}>
            <Button onClick={() => handleLogout()} title="Logout" size="middle" style={{ marginTop: 20 }}>Logout</Button>
        </Modal>
    );
};

export default Menu;
