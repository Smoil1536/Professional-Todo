<script>
    import { Router, Route } from "svelte-routing";
  
    import Home from "./routes/Home.svelte";
    import Todo from "./routes/Todo.svelte";
    import Header from "./lib/components/Header.svelte";
    export let url = "";
  </script>

  
  <Router {url}>
    <Header />
    <div>
      <!-- Cast Home to ComponentType -->
      <Route path="/todo"><Todo/></Route>
      <Route path="/"><Home/></Route>
    </div>
  </Router>