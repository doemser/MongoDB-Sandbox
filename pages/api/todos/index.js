// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Todo from "../../../models/todo.model";
import dbConnect from "../../../database/index.js";

export default async function handler(request, response) {
  const { method, body } = request;
  await dbConnect();

  if (method === "GET") {
    try {
      const mongoResponse = await Todo.find();
      response.status(200).json(mongoResponse);
    } catch (error) {
      response.status(500).send("nope..");
    }
  } else if (request.method === "POST") {
    try {
      const todo = new Todo(body);
      const mongoResponse = await todo.save();
      return response.status(201).json(mongoResponse);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "PUT") {
    try {
      const mongoResponse = await Todo.findByIdAndUpdate(body.todoID, {
        $set: body.updatedTodo,
      });
      return response.status(202).json(mongoResponse);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
