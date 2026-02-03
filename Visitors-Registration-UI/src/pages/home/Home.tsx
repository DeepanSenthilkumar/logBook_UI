import './Home.css'
import Button from '../../components/buttons/buttons.tsx'

const Home = () => {
  return (
    <>
    <div className='container-class d-flex gap-3 row'>
      <div className='header-container'>
        <p className='header-text'>ICODEX PUBLISHING SOLUTIONS</p>

        <p className='secondary-text'>Welcome to iCodex Publishing Solutions - Where ideas Become Impactful Publications </p>
      </div>

      <div className='d-flex gap-3'>
        <Button variant='admin-landing' text='Admin' to='/login'></Button>
        <Button variant='visitor-landing' text='Visitor' to='/visitor'></Button>
      </div>

      <div style={{paddingLeft: '35px', width: '93%', marginTop: '25px'}}>
        <div className='inline-block'>
          <span>Secure</span>
          <span>Simple</span>
          <span>Scalable</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home