<script>
    import {Router, Route} from "svelte-routing";
    import Home from "./routes/Home.svelte";
    import Todo from "./routes/Todo.svelte";
    import Header from "./lib/components/Header.svelte";
</script>

<Router>
    <Header/>
    <Route path="/"><Home /></Route>
    <Route path="/todo/:id" component={Todo}/>
</Router>