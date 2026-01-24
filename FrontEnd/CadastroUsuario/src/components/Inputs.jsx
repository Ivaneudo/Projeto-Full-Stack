import Input from '../components/Inputs.module.css';

const Inputs = (props) => {
  return (
    <div className={Input.container}>
      <input {...props} />
      {props.err && <p className={Input.error}>{props.err}</p>}
    </div>
  )
}

export default Inputs