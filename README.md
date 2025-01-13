What is Microservice?
What is Monolith architecture?
What is the difference between `Monolith and Microservice?
Why do we need a useEffect Hook?
What is Optional Chaining?
What is Shimmer UI?
What is the difference between JS expression and JS statement?
What is Conditional Rendering? explain with a code example.
What is CORS?
What is async and await?
What is the use of const json = await data.json(); in getRestaurants()?



Revising last chapter - useState() and Hooks

Why React is fast ?

It's because of its fast DOM manipulation -> Using Reconciliation (diff algorithm)

Why use state ?

React only tracks variables which are state variables.

In this chapter, we are going to get data from outside our application through API. Earlier, we got data from mock data.

Monolithic Architecture -> Both Client & Server running in the same system

Micro Services -> Separate projects for Client & Server and lot of services for specific funtionality

SoC (Separation of Concern) -> Every service in microservices serves a single functionality

We are going to build -> UI microservices

UI microservices -> Explore the world through API

fetch -> to call API

on page load -> fetch the api data and show all the restaurants

Two approaches :

On load -> call API -> render
on load -> render some defaults -> call API -> updates UI
React Hook -> useEffect() -> render something -> do some operation -> update the UI

useEffect(callback) -> useEffect will call callback function after intial render if there are no dependencies (only once)

What if we want to re-render after every state changes -> Pass state in dependency array.

When component re-renders ? when state/props changes

useEffect (callback, [dependencies]);

Where to make API call ?

useEffect(()=>{ //API call },[])

Steps :

First, component will be rendered
useEffect() and render with intial data
When API call is made,
Shimmer ->

Conditional rendering

On page load, shimmer UI -> when restaurants empty when res data -> actual data UI

Early return -> not render

How to avoid rendering components ? optional chaining or