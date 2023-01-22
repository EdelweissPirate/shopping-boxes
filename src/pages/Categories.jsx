import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import Helmet from "../components/Helmet/Helmet"

import { transitionHome, setFocusedCategory } from '../features/animation/animationSlice'
import { setActiveCategory } from "../features/data/dataSlice"
import { switchClass } from "../utils"

function Categories() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { categories } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(transitionHome(true))
        dispatch(setFocusedCategory(false))
    
        return () => {
            dispatch(transitionHome(false))
        }
    }, [])

    const onClick = (e, i) => {
        e.preventDefault()
        
        dispatch(setActiveCategory(i))
        switchClass(
            document.getElementById('categories'), 
            'fade-out', 
            navigate, 
            `/shop/${categories[i].toLowerCase()}`
        )
    }

    const onHover = (i) => {
        dispatch(setFocusedCategory(i))
    }

    const generateCategories = () => {
        const _cats = categories.map((item, i) => {
            return <button
                onClick={e => {onClick(e, i)}}
                onMouseEnter={() => onHover(i)} 
                onMouseLeave={() => onHover(false)} 
                key={i} 
                className="hover-button btn-long flex flex-center border round-corners"
            >
                {item}
            </button>
        })

        return [..._cats]
    }

    return (
        <>
        <Helmet title={'Categories'} />
        <section id="categories">
            <div className="categories-menu slide-in h-fill flex flex-center col" >
                <h2 className="spacer">Please select a categories</h2>
                <div className="round-corners border grid categories-menu-inner p-1 w-fill">
                    {generateCategories()}
                </div>
            </div>
        </section>
        </>
    )
}

export default Categories