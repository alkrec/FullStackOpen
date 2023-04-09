const Filter = (props) => {
    const {searchName, handleSearchChange} = props

    return (
        <div>
            filter shown with <input value={searchName} onChange={handleSearchChange}/>
            </div>
    )
}

export default Filter