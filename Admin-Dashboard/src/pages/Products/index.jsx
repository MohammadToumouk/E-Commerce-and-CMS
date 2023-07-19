import { useEffect, useState } from 'react'
import "./Products.css"

import TitleHeadings from '@/components/TitleHeading'

import axios from 'axios'

import { format } from 'date-fns' 

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { columns } from "../../components/Tables/columns"
 
const Products = () => {
  const [products, setProducts] = useState()

  useEffect(() => {
    const fetchProducts = async () => {
        await axios.get('http://localhost:3069/product', { withCredentials: true })
          .then((response) => {
            setProducts(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
    }
    fetchProducts()
  }, [])

  const formattedProducts = products?.products?.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    quantity: product.quantity,
    createdAt: format(new Date(product.createdAt), 'dd/MM/yyyy'),
    updatedAt: format(new Date(product.updatedAt), 'dd/MM/yyyy'),
  }))

  console.log("allProducts", products)

  return (
    <div className='products-container'>
      <div className='products-content'>
        <div className='products-header'>
          <TitleHeadings 
            title='Products'
            elements={products?.products?.length}
            subtitle='Manage all of your products'
          />
          <Button 
            variant="outline" 
            className="addProduct-button" 
            size="sm" 
          >
            <Plus className='mr-2' size={16} /> Add Product
          </Button>
        </div>
        <div className='mt-10'>
            {formattedProducts && <DataTable columns={columns} data={formattedProducts} />}
        </div>
      </div>
    </div>
  )
}

export default Products
