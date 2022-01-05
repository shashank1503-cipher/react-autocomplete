import React,{ useState } from "react";
import styles from './Autocomplete.module.css'
import PropTypes from "prop-types";
const Autocomplete = (props) => {
    const [ActiveOption, setActiveOption] = useState(0);
    const [FilteredOptions, setFilteredOptions] = useState([]);
    const [ShowOptions, setShowOptions] = useState(false);
    const [UserInput, setUserInput] = useState("");
    const onChange = (e) =>{
        const options = props.options
        setUserInput(e.currentTarget.value);
        const filtered = options.filter((option) => option.toLowerCase().indexOf(UserInput.toLowerCase()) > -1);
        setFilteredOptions(filtered);
        setShowOptions(true);
    }
    const onClick = (e) =>{
        setActiveOption(0)
        setFilteredOptions([])
        setShowOptions(false)
        setUserInput(e.currentTarget.innerText)
    }
    const onKeyDown = (e) =>{
        if (e.keyCode === 13){
            setActiveOption(0)
            setShowOptions(false)
            setUserInput(FilteredOptions[ActiveOption])
        }
        else if(e.keyCode === 38){
            if (ActiveOption === 0){
                return;
            }
            setActiveOption(ActiveOption -1)
        }
        else if(e.keyCode === 40){
            if(ActiveOption === FilteredOptions.length -1){
                return;
            }
            setActiveOption(ActiveOption + 1)
        }
    }
    let optionList;
    if(ShowOptions && UserInput){
        if(FilteredOptions.length){
            optionList = (
                <ul>
                    {
                        FilteredOptions.map((optionName,index) => {
                            return (
                                <li className={ActiveOption === index ? styles.active : styles.nonActive} key={optionName} onClick={onClick}>
                                    {optionName}
                                </li>
                            );
                        })
                    }
                </ul>
            );
        } else {
            optionList = (
                <div className={styles.noOption}>
                    <p>No Options!</p>
                </div>
            )
        }
    }
    return (
      <div className={styles.search}>
        <input
            type="text"
            className={styles.search_box}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={UserInput}
          />
            {optionList}
        </div>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Autocomplete;
