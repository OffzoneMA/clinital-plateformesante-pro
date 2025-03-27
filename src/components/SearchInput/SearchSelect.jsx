import { useState, useRef, useEffect } from "react";
import Mark from "mark.js";

const SearchSelect = ({
    label,
    name,
    placeholder,
    options,
    param,
    value,
    onChange,
    error,
    loading,
    allowAdd,
    onAdd,
    renderItem,
}) => {

    const [inputFocused, setInputFocused] = useState(false);
    const [search, setSearch] = useState(" ");
    const [newItem, setNewItem] = useState("");
    const containerRef = useRef(null);

    const filterSearch = (query, array, key) => {
        const normalizedQuery = query?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        return array?.filter((item) =>
            item[key]?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizedQuery)
        ) || [];
    };

    const handleSearch = () => {
        const context = containerRef.current;
        const instance = new Mark(context);
        instance.unmark();
        if (search) instance.mark(search);
    };

    useEffect(() => {
        handleSearch();
    }, [search]);


    return (
        <div className="search-select">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                className={error ? "error" : ""}
                value={value}
                readOnly
                onClick={() => {
                    setInputFocused(!inputFocused);
                    setSearch(" ");
                }}
                style={{ paddingRight: "30px" }}
            />
            <img
                src="../icons/select.svg"
                alt="Search Icon"
                className="search-icon"
            />
            {inputFocused && (
                <div className="result" ref={containerRef}>
                    <div className="search-container">
                        <input
                            type="text"
                            name={name}
                            className="search-result"
                            placeholder={"Search " + label}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ paddingRight: "30px" }}
                        />
                        <img src="../icons/search-md.svg" alt="Search Icon" className="search-icon-result" />
                    </div>
                    {allowAdd && (
                        <div className="add-container">
                            <input
                                type="text"
                                placeholder={`Add new ${label}`}
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                            />
                            <button
                                onClick={() => {
                                    if (newItem.trim()) {
                                        onAdd(newItem);
                                        setNewItem("");
                                    }
                                }}
                                disabled={!newItem.trim()}
                            >
                                Add
                            </button>
                        </div>
                    )}
                    {loading ? (
                        <span className="loading">Loading...</span>
                    ) : (
                        filterSearch(search, options, param)?.map((x, index) => (
                            <span
                                key={index}
                                onClick={() => {
                                    onChange(x);
                                    setInputFocused(false);
                                }}
                            >
                                {renderItem ? renderItem(x) : x[param]}
                            </span>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchSelect;
