import {
  addNoteHandler, deleteNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler,
} from './handler.mjs';

const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: (req, h) => { // h singkatan dari hapi
      const res = h.response('Homepage');

      res.type('text/html');
      res.header('X-Custom', 'some-value');
      res.code(200);

      return res;
    },
  },
  {
    method: '*',
    path: '/',
    handler: (req, h) => {
      const res = h.response('Halaman tidak dapat diakses dengan method tersebut');

      res.type('text/html');
      res.header('X-Custom', 'some-value');
      res.code(400);

      return res;
    },
  },
  {
    method: 'GET',
    path: '/about',
    handler: (req, h) => {
      const res = h.response('About Page');

      res.type('text/html');
      res.header('X-Custom', 'some-value');
      res.code(200);

      return res;
    },
  },
  {
    method: '*',
    path: '/about',
    handler: (req, h) => {
      const res = h.response('Halaman tidak dapat diakses dengan method tersebut');

      res.type('text/html');
      res.header('X-Custom', 'some-value');
      res.code(400);

      return res;
    },
  },
  {
    method: 'GET',
    path: '/hello/{name?}', // tanda '?' artinya opsional
    handler: (req, h) => {
      const { name = 'stranger' } = req.params;
      const { lang } = req.query;
      // const { username, password } = request.payload;

      if (lang === 'id') {
        return `Hai, ${name}!`;
      }

      const res = h.response(`Hello, ${name}!`);

      res.type('text/html');
      res.header('X-Custom', 'some-value');
      res.code(200);

      return res;
    },
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (req, h) => {
      const res = h.response('Halaman tidak ditemukan');

      res.type('text/html');
      res.header('X-Custom', 'some-value');
      res.code(404);

      return res;
    },
  },
];

export default routes;
