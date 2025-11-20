import styles from "./InputField.module.css"

const InputField = ({ 
    label,
	name,
	type = 'text',
	value,
	onChange
}) => {
return (
	<div className={styles.field}>
		<label >{label}</label>
		<input
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			className={styles.input}
		/>		
	</div>
	);
};

export default InputField;