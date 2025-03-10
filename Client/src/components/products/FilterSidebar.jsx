import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    category: "",

    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  })

  const [priceRange, setPriceRange] = useState([0, 100])

  const categories = ["Top Wear", "Bottom Wear"]
  const colors = ["Red", "Blue","Black", 'Green', "Yellow", "Gray", "White", "Pink","Beige", "Navy" ]

  const sizes = ["XS","S", "M", "L", "XL", "XXL"]

  const materials = ["Cotton", "Wool", "Denim", "Silk", ]
  const brands = ["Nike", "Adidas", "Zara", "H&M", "Gucci"];

  const genders = ["Men", "Women"]


 useEffect(() => {
  const params = Object.fromEntries([...searchParams])

  setFilters({
    category: params.category || "",
    gender: params.gender || "",
    color: params.color || "",
    size: params.size ? params.size.split(", ") : [],
    material: params.material ? params.material.split(", ") : [],
    brand: params.brand ? params.brand.split(", ") : [],
    minPrice: params.minPrice || 0,
    maxPrice: params.maxPrice || 100, 
  })

  setPriceRange([0, params.maxPrice || 100])
 }, [searchParams])

 const handleFilterChange = (e) => {
  const {name, value, checked, type} = e.target

  let newFilters = { ...filters }

  if(type === "checkbox"){
    if(checked){
      newFilters[name] = [...(newFilters[name] || []), value]
    } else{
      newFilters[name] = newFilters[name].filter((item) => item !== value)
    }
  }else{
    newFilters[name] = value
  }
  setFilters(newFilters)
  // console.log(newFilters)
  updateURLParams(newFilters)
 }

// update URL Params
const updateURLParams = (newFilters) => {
  const params = new URLSearchParams()
  Object.keys(newFilters).forEach((key) => {
    if(Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
      params.append(key, newFilters[key].join(","))
    }else if(newFilters[key]){
      params.append(key, newFilters[key])
    }
  })
  setSearchParams(params)
  navigate(`?${params.toString()}`)
}

const handlePriceChange = (e) => {
  const newPrice = e.target.value;
  setPriceRange([0, newPrice])
  const newFilters = {...filters, minPrice: 0, maxPrice: newPrice}
  setFilters(filters)
  updateURLParams(newFilters)
}

  return (
    <>
    <div className='p-4'>
      {/* <h3 className='mb-2'>Filter</h3> */}

      {/* category Filter */}
      <div className='mb-3'>
        <lable className="d-block mb-2 fs-4">Category</lable>
        {categories.map((category) => (
          <div key={category} className=' mb-1'>
            <input type="radio" name="category" className='me-2 mb-2'  value={category}
            
            onChange={handleFilterChange}
            // checked={filters.category === category}
            style={{transform: "scale(1.5)", marginRight: "5px"}}/>
            
            <span>{category}</span>
          </div>
        ))}
      </div>

         {/* Gender Filter */}
      <div className='mb-3'>
        <lable className="d-block mb-2 fs-4">Gender</lable>
        {genders.map((gender) => (
          <div key={gender} className=' mb-1'>
            <input type="radio" name="gender" className='me-2 mb-2'  value={gender} 
            // checked={filters.gender === gender}
             onChange={handleFilterChange}
            style={{transform: "scale(1.5)", marginRight: "5px"}}/>
            
            <span>{gender}</span>
          </div>
        ))}
      </div>
           {/* color Filter */}
        <div className='mb-3'>
          <lable className="d-block mb-2 fs-4">Color</lable>
          <div className=' mb-1'>
            {colors.map((color) => (
              <button key={color} name="color" className='rounded-circle border me-2 border-primary' 
              value={color}
              // checked={filters.color === color}
              onClick={handleFilterChange}
              style={{width: 35, height: 35, 
                backgroundColor: color.toLowerCase(),
                
              }}></button>
            ))}
          </div>
        </div>

        {/* size filter */}
        <div className="mb-3">
          <label className="d-block mb-2 fs-4">Size</label>
          {sizes.map((size) => (
            <div key={size} className='d-flex mb-1'>
             <input type="checkbox" name="size" className="me-2"
             value={size}
            //  checked={filters.size.includes(size)}
             onChange={handleFilterChange}
             style={{width: 25, height: 25}}/>
             <span >{size}</span>
            </div>
          ))}
        </div>

         {/* Material filter */}
         <div className="mb-3">
          <label className="d-block mb-2 fs-4">Mateial</label>
          {materials.map((material) => (
            <div key={material} className='d-flex mb-1'>
             <input type="checkbox" name="material" className="me-2"
             value={material}
            //  checked={filters.material.includes(material)}
             onChange={handleFilterChange}
             style={{width: 25, height: 25}}/>
             <span >{material}</span>
            </div>
          ))}
        </div>


         {/* Brand filter */}
         <div className="mb-3">
          <label className="d-block mb-2 fs-4">Brand</label>
          {brands.map((brand) => (
            <div key={brand} className='d-flex mb-1'>
             <input type="checkbox" name="brand"
             value={brand}
            //  checked={filters.brand.includes(brand)}
             onChange={handleFilterChange} 
             className="me-2"style={{width: 25, height: 25,}}/>
             <span >{brand}</span>
            </div>
          ))}
        </div>


             {/* Price Range Filter */}
             <div className="mb-3">
              <label className='d-block mb-2 fs-4'>Price Range</label>
              <input type="range" name="priceRange" className="w-100 rounded" min={0} max={100} 
              value={priceRange[1]}
              onChange={handlePriceChange}/>
              <div className='d-flex justify-content-between mt-2'>
                <span>$ 0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
    </div>
    </>  
  )
}



export default FilterSidebar