export default interface IMenu {
    isOpen: boolean,
    openCallback: React.Dispatch<React.SetStateAction<boolean>>
}