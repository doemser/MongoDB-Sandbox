// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Todo from "../../../models/todo.model";
import dbConnect from "../../../database/index.js";

export default async function handler(request, response) {
  const {
    method,
    body,
    query: { id },
  } = request;
  await dbConnect();

  if (method === "GET") {
    try {
      const mongoResponse = await Todo.findById(id);
      response.status(200).json(mongoResponse);
    } catch (error) {
      response.status(500).send("nope..");
    }
  } else if (request.method === "PUT") {
    try {
      const mongoResponse = await Todo.findByIdAndUpdate(id, {
        $set: body.updatedTodo,
      });
      return response.status(202).json(mongoResponse);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  } else if (method === "DELETE") {
    try {
      const mongoResponse = await Todo.findByIdAndDelete(id);
      response.status(200).json(mongoResponse);
    } catch (error) {
      return response.status(403).send({ error: error.message });
    }
  } else {
    return response.status(405).send({ message: "Eh yo! Check your method!" });
  }
}
