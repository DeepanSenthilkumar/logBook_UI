import './Home.css'
import Button from '../../components/buttons/buttons.tsx'

const Home = () => {

  return (
    <>
    <div className='container-class shadow-sm d-flex flex-column gap-3'>
      {/* <div className='border-container'> */}
        <div className='header-container'>
          <p className='header-text'>ICODEX PUBLISHING SOLUTIONS</p>

          <p className='secondary-text'>Welcome to iCodex Publishing Solutions - Where ideas Become Impactful Publications </p>
        </div>

        <div className='button-row'>
          <Button variant='admin-landing btn-size' text='Admin' to='/login'></Button>
          <Button variant='visitor-landing btn-size' text='Visitor' to='/visitor'></Button>
        </div>

        <div className="inline-wrapper">
          <div className='inline-block gap-3'>
            <span>Secure</span>
            <span>Simple</span>
            <span>Scalable</span>
          </div>
        </div>
      </div>
    {/* </div> */}
    </>
  )
}

export default Home