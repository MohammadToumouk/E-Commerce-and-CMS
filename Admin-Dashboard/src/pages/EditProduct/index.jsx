import {useEffect, useState } from 'react'
import "./Edit.Product.css"
"use client"

import TitleHeadings from '@/components/TitleHeading'

import axios from 'axios'

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { XIcon } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import { Link, useParams } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { TextareaWithLabel } from '@/components/Textarea'
import UploadWidget from '@/components/UploadWidget'

const formSchema = z.object({
  name: z.string().min(3).max(20),
  images: z.array(z.object({ url: z.string().url() })).min(1),
  price: z.string().min(1).max(50),
  quantity: z.string().min(1).max(50),
  category: z.string().min(1).max(50),
  sizes: z.array(z.string()).min(0), // Mindestlänge auf 0 gesetzt
  color: z.array(z.string()).min(0), // Mindestlänge auf 0 gesetzt
  description: z.string().min(0).max(255),
});

 
const EditProduct = () => {
  const [imageUrl, setImageUrl] = useState();
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaSizesValue, setTextareaSizesValue] = useState("");
  const [textareaColorValue, setTextareaColorValue] = useState("");

  const [brand , setBrand] = useState();
  const [name, setName] = useState();

  const productId = useParams();
  const [product, setProduct] = useState()

  console.log("brand", brand)
  console.log("name", name)

  useEffect(() => {
    const fetchProduct = async () => {
        await axios.get( `http://localhost:3069/product/${productId.id}`, { withCredentials: true })
          .then((response) => {
            setProduct(response.data)
            setName(response.data.product.name)
            setBrand(response.data.product.brand)
          })
          .catch((error) => {
            console.log(error)
          })
    }
    fetchProduct()
  }, [])

  console.log("product", product)
 

  const form = useForm({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //     name: product.name,
    //     brand: brand,
    //     images: [],
    //     price: "",
    //     quantity: "",
    //     category: "",
    //     sizes: [],
    //     color: [],
    //     description: "",
    // },
  })

  const onSubmit = async (values) => {
    try {

      const response = await axios.post('http://localhost:3069/product/', {
        name: values.name,
        images: values.images[0]["url"],
        price: parseInt(values.price),
        quantity: parseInt(values.quantity),
        category: values.category,
        sizes: values.sizes,
        color: values.color,
        description: values.description,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log('Response from server:', response.data);
      // Add any further actions or notifications for successful submission here.
    } catch (error) {
      console.error('Error while submitting:', error);// Add error handling or notifications for failed submissions here.
      console.log("DataWithError", values)
    }

    console.log("testData", values)
  }

  const handleDescriptionChange = (newValue) => {
    setTextareaValue(newValue);
    form.setValue("description",  newValue );
  };

  const handleSizesChange = (newValue) => {
    const sizesArray = newValue.split('\n').map((size) => size.trim());
    setTextareaSizesValue(sizesArray);
    form.setValue("sizes", sizesArray);
  };

  const handleColorChange = (newValue) => {
    const colorArray = newValue.split('\n').map((size) => size.trim());
    setTextareaColorValue(colorArray);
    form.setValue("color", colorArray);
  };

  const handleImageUpload = async (newImage) => {
    await setImageUrl(newImage);
    form.setValue("images", [{ url: newImage }]);
  };


 
  return (
    <div className='products-container'>
      <Sidebar />
      <div className='products-content'>
        <div className='products-header'>
          <TitleHeadings 
            title='Edit Product'
            subtitle="Add a new product to your store"
          />
          <Link to='/products'>
            <Button 
              variant="outline" 
              className="addProduct-button" 
              size="sm" 
            >
              <XIcon size={20} /> 
            </Button>
          </Link>
        </div>
        <div className='my-10 pl-8'>
          <div className='flex items-center'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex justify-center items-start'>
                <div className='inputs-container'> 
                  <FormField 
                    control={form.control} 
                    name="name" 
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <>
                            <Input type="text" value={"asdasd"} className="add-product-input" {...field} />
                            </>
                          </FormControl>
                          <FormMessage>

                          </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="brand" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Brand*</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder={brand} className="add-product-input" {...field} />
                          </FormControl>
                          <FormMessage>

                          </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="price" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Price*</FormLabel>
                          <FormControl>
                          <Input type="number" placeholder="Price in $" className="add-product-input"{...field} />
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  /> 
                  <FormField 
                    control={form.control} 
                    name="quantity" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Quantity*</FormLabel>
                          <FormControl>
                          <Input type="number" min="0" placeholder="Amount in Stock" className="add-product-input" {...field} />
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="category" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                        <FormLabel>Category*</FormLabel>
                          <FormControl>
                            <select id="mySelect" name="category" className='category-container' {...field}>
                              <option hidden className='category-placeholder'>Select a category</option>
                              <option value="accessories">Accessories</option>
                              <option value="bags">Bags</option>
                              <option value="clothes">Clothes</option>
                              <option value="drinks">Drinks</option>
                              <option value="electronics">Electronics</option>
                              <option value="groceries">Groceries</option>
                              <option value="jewelry">Jewelry</option>
                              <option value="mobiles">Mobiles</option>
                              <option value="notebook">Notebook</option>
                              <option value="shoes">Shoes</option>
                              <option value="sports">Sports</option>
                              <option value="toys">Toys</option>
                              <option value="watches">Watches</option>
                            </select>                    
                          </FormControl>
                        <FormMessage>
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="sizes" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <TextareaWithLabel
                           label={"Sizes"}
                           placeholder="Please type every size on a new line (e.g. S, M, L, XL, ...)"
                           className="add-product-input"
                           {...field}
                           rows={3}
                           value={textareaSizesValue} // Make sure this is set correctly
                           onChange={handleSizesChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="color" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <TextareaWithLabel
                            label={"Color"}
                            placeholder="Please type every color on a new line (e.g. red, blue, green, ...)"
                            className="add-product-input"
                            {...field}
                            rows={2}
                            value={textareaColorValue} // Make sure this is set correctly
                            onChange={handleColorChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='ml-12'>
                   <FormField 
                    control={form.control} 
                    name="images" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel>Image Upload*</FormLabel>
                          <FormControl>
                            <UploadWidget onImageUpload={handleImageUpload} {...field} />
                          </FormControl>
                          <FormMessage>
                          </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control} 
                    name="description" 
                    render={({ field }) => (
                      <FormItem className='input-item-container'>
                          <FormLabel></FormLabel>
                          <FormControl>
                             <TextareaWithLabel 
                              label={"Description"}
                              placeholder={"Type your product description here."}
                              className="add-product-input w-[580px]  h-[120px]"
                              onChange={handleDescriptionChange} />
                          </FormControl>
                      </FormItem>
                    )}
                  /> 
                 </div>
              </div>
                  <div className="space-x-2 flex justify-end items-center w-full">
                      <Button disabled={imageUrl ? false : true} className="create-product-button" type="submit">Create</Button>
                  </div>
              </form>
            </Form>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
