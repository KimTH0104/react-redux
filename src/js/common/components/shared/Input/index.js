import React from 'react';
import './styles.css';

type InputProps = {
  name: string;
  onChange: any;
  value: any;
  type: 'text' | 'password';
  placeholder?: string;
}

const Input = (props: InputProps) => {
  const type = props.type | 'text';
  return <input name={props.name} type={type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} className="input" />
}

export default Input;
