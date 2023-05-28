import React from 'react';
import './styles.css';

type TextareaProps = {
  name: string;
  onChange: any;
  value: any;
  rows?: number;
  placeholder?: string;
}

const Textarea = (props: TextareaProps) => {
  const rows = props.rows | 3;
  return <textarea name={props.name} value={props.value} rows={rows} onChange={props.onChange} placeholder={props.placeholder} className="textarea" />
}

export default Textarea;
