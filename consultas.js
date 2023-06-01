// Consultar una asignatura
coleccion.find_one({"nombre":"Matematicas"})

// Consultar las asignaturas que están en un aula concreta
coleccion.find({"aula": "Virtual"})

// Consultar asignaturas con más de un profesor
coleccion.find({"profesores.1": {"$exists":"true"}})

//Consultar la nota media de todas las asignaturas
coleccion.aggregate([
  { "$unwind": "$alumnos" }, 
  {"$group": {"_id":"$nombre", "nota_media":{"$avg":"$alumnos.nota_asignatura"}}}
])

// Consultar nota media de una asignatura
coleccion.aggregate([
  { "$unwind": "$alumnos" }, 
  {"$match": {"nombre": "TIC"}}, 
  {"$group": {"_id":"$nombre", "nota_media":{"$avg":"$alumnos.nota_asignatura"}}}
])

// Consultar las asignaturas por orden de demanda, siendo la más demandada la primera
coleccion.aggregate([
  { "$unwind": "$alumnos" },
  {
      '$group': {
          "_id": "$nombre",
          "count": {'$sum': 1}
      }
  },
  {"$sort": {"count": -1}}
])

// Consultar profesores de una asignatura en concreto
coleccion.aggregate([
  {"$match": {"nombre": "Plastica"}},
  {"$unwind": "$alumnos"},
  {"$project": {"_id": "$alumnos.dni", "nombre": "$alumnos.nombre"}}
])

// Consultar alumnos de una asignatura en concreto
coleccion.aggregate([
  {"$match": {"nombre": "Ingenieria software"}},
  {"$unwind": "$profesores"},
  {"$project": {"_id": "$profesores.dni", "nombre": "$profesores.nombre"}}
])