import  { Suspense } from 'react'
import Loader from '../components/Loader'
import DetailedChampaign from './DetailedChampaign'

const Home = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>} >

        <DetailedChampaign/>
      </Suspense>
    </div>
  )
}

export default Home