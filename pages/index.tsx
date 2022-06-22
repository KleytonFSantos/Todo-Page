import { GetServerSideProps } from "next"
import { getAllTodos, Todo } from "../lib/db";

export const getServerSideProps: GetServerSideProps = async () => 
{
  const todos = await getAllTodos();
  return {
    props: {
      todos,
    },
  };
};

interface PostProps {
  todos: Todo[];
}

  const Home = ({ todos }: PostProps) => {
  return (
    <div>
      {(JSON.stringify(todos))}
    </div>
  )
}

export default Home
