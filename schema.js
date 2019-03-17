import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
  } from 'graphql';
  
  import fetch from 'node-fetch';
  
  import { BASE_URL } from './constants';
  
  const MemberType = new GraphQLObjectType({
    name: 'Member',
    description: 'A Community Member',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'A member\'s personal id',
            resolve: (person) => person.objectId
        },
        fname: {
            type: GraphQLString,
            description: 'A member\'s first name',
            resolve: (person) => person.fname
        },
      lname: {
        type: GraphQLString,
        description: 'A member\'s last name',
        resolve: (person) => person.lname
      },
      sex: {
        type: GraphQLString,
        description: 'A member\'s sex',
        resolve: (person) => person.sex
      },
      date_of_birth: {
        type: GraphQLString,
        description: 'Date of birth',
        resolve: (person) => person.dob
      },
      telephone_number: {
        type: GraphQLString,
        description: 'Telephone Number',
        resolve: (person) => person.telephoneNumber
      },
      education_level: {
        type: GraphQLString,
        description: 'Education Level',
        resolve: (person) => person.educationLevel
      },
      occupation: {
        type: GraphQLString,
        description: 'Occupation',
        resolve: (person) => person.occupation
      },
      city: {
        type: GraphQLString,
        description: 'City',
        resolve: (person) => person.city
      },
      province: {
        type: GraphQLString,
        description: 'Province',
        resolve: (person) => person.province
      },
      clinic_provider: {
        type: GraphQLString,
        description: 'Clinic Provider',
        resolve: (person) => person.clinicProvider
      },
      cedula_number: {
        type: GraphQLString,
        description: 'License Number',
        resolve: (person) => person.cedulaNumber
      },
      record_owning_organization: {
        type: GraphQLString,
        description: 'Surveying Organization',
        resolve: (person) => person.surveyingOrganization
      },
      latitude: {
        type: GraphQLString,
        description: 'Latitude',
        resolve: (person) => person.latitude
      },
      longitude: {
        type: GraphQLString,
        description: 'Longitude',
        resolve: (person) => person.longitude
      },
    })
  });
  
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query of all',
    fields: () => ({
      Members: {
        type: new GraphQLList(MemberType),
        description: 'All Puente Members',
        resolve: (root, args) => fetch(`${BASE_URL}/records/`)
          .then(response => response.json())
          .then(data => data.records)
      },
      Member: {
        type: MemberType,
        args: {
          id: { 
            type: GraphQLString
          }
        },
        resolve: (root, args) => fetch(`${BASE_URL}/records/${args.id}`)
            .then(response => response.json())
            .then(data => data)
        }
    })
  })
  
  export default new GraphQLSchema({
    query: QueryType
  });