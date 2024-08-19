'use client';
import { useState } from 'react';
import styles from './contact.module.css'

export default function Contact() {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = { email, name, message };
    fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL+`/api/contact`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setEmail('');
        setName('');
        setMessage('');
        alert('Thankyou');
      })
      .catch((error) => { console.log(error) });;
  }
  const handlechange = (e: any) => {

    if (e.target.name == 'email') {
      setEmail(e.target.value);
    } else if (e.target.name == 'name') {
      setName(e.target.value);
    }
    else if (e.target.name == 'message') {
      //setComment(e.target.innerText);
      setMessage(e.target.value);
    }
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (<div className="flex items-top justify-left p-6 md:w-4/5 md:px-2 md:py-12 bg-gray-50 rounded-lg">
    <section className="text-gray-600 body-font relative">
      <form onSubmit={handleSubmit}>
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input type="text" value={name} onChange={handlechange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" name="name" id="name" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>

                  <input type="email" value={email} onChange={handlechange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" name="email" id="email" aria-describedby="emailHelp" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                  <textarea id="message" name="message" className=""></textarea>
                  <textarea value={message} onChange={handlechange} name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder="Leave a comment here" id="message"></textarea>

                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
              </div>
             
            </div>
          </div>
        </div>
      </form>
    </section>

  </div>);
}