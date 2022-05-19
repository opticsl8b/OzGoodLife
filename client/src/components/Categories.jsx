import  styled from 'styled-components'
import {categories} from '../categoriesData'
import CategoryItem from './CategoryItem'

const Container=styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
`

const Categories = () => {
  return (
    <Container>
        {categories.map(catData=>(
            <CategoryItem catData={catData}/>
        ))}
    </Container>
  )
}

export default Categories