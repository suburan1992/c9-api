// Create and Save a new Resource
exports.create = model => async (req, res) => {
    // Save Resource in the database
    try{
        const record = await model.create({...req.body})
        res.status(200).json({data:record, message:"Success"})
    } catch(e){
        res.status(500).json({message:"Error"})
    }
};

// Retrieve all Resources from the database.
exports.findAll = model => async (req, res) => {
  try{
      const records = await model.findAll()
      res.status(200).json({data:records, message:"Success"});
  }
  catch(e){
      res.status(500).json({message:"Error"})
  }
};

// Find a single Tutorial with an id
exports.findOne = model => async (req, res) => {
  const id = req.params.id;
  try{
    const record = await model.findByPk(id)
    res.status(200).json({data:record, message:"Success"});
  }
  catch(e){
    res.status(500).json({message:"Error"})
  }
};

// Update a Tutorial by the id in the request
exports.update = model => async (req, res) => {
  const id = req.params.id;
  try{
    const record = await model.update(req.body, {
      where: { id: id }
    });
    res.status(200).json({data:record, message:"Success"});
  }
  catch(e){
    res.status(500).json({message:"Error"})
  }
};

// Delete a Tutorial with the specified id in the request
exports.deleteOne = model => async (req, res) => {
  const id = req.params.id;
  try{
    const record = await model.destroy({
      where: { id: id }
    })
    res.status(200).json({data:record, message:"Success"});
  }
  catch(e){
    res.status(500).json({message:"Error"})
  }
}

// Delete all Resources from the database.
exports.deleteAll = model => async (req, res) => {
  try{
    const record = await model.destroy({
      where: {},
      truncate: false
    })
    res.status(200).json({data:record, message:"Success"});
  }
  catch(e){
    res.status(500).json({message:"Error"})
  }
};

// find all published Tutorial
exports.findAllPublished = model => async (req, res) => {
  try{
    const records = await model.findAll({where: { published: true }})
    res.status(201).json({data:records, message:"Success"});
  }
  catch(e){
    res.status(400).json({message:"Error"})
  }
};
/*
exports.controller = crudController = model => ({
  create : create(model),
  findAll : findAll(model),
  findOne : findOne(model),
  update : update(model),
  delete : deleteOne(model),
  deleteAll : deleteAll(model)
});
*/
