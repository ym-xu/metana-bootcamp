import request from 'supertest';
import app from '../app';
import Blog from '../models/Blog';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../models/Blog', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}));

describe('Blog API', () => {
    let token;
    let mockBlog;
  
    beforeAll(async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
  
      User.create.mockResolvedValue({
        id: 1,
        username: 'testadmin',
        email: 'testadmin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
  
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testadmin',
          email: 'testadmin@example.com',
          password: 'password123'
        });
  
      console.log('Register response:', registerResponse.body);
  
      await User.update({ role: 'admin' }, { where: { email: 'testadmin@example.com' } });
  
      User.findOne.mockResolvedValue({
        id: 1,
        username: 'testadmin',
        email: 'testadmin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
  
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testadmin@example.com',
          password: 'password123'
        });
  
      console.log('Login response:', loginResponse.body);
  
      token = loginResponse.body.token;
      console.log('JWT Token:', token);

      const decodedToken = jwt.decode(token);
      console.log('Decoded JWT Token:', decodedToken);
  
      mockBlog = {
        id: 1,
        title: 'Test Blog',
        content: 'Test Content',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a new blog', async () => {
      Blog.create.mockResolvedValue(mockBlog);
  
      const res = await request(app)
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Blog',
          content: 'Test Content',
        });
  
      console.log('Create blog response:', res.body);
  
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(mockBlog);
      expect(Blog.create).toHaveBeenCalledWith({
        title: 'Test Blog',
        content: 'Test Content',
      });
    });  

  it('should get all blogs', async () => {
    Blog.findAll.mockResolvedValue([mockBlog]);

    const res = await request(app)
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      {
        ...mockBlog,
        createdAt: new Date(mockBlog.createdAt).toISOString(),
        updatedAt: new Date(mockBlog.updatedAt).toISOString(),
      },
    ]);
    expect(Blog.findAll).toHaveBeenCalled();
  });

  it('should get a blog by ID', async () => {
    Blog.findByPk.mockResolvedValue(mockBlog);

    const res = await request(app)
      .get('/api/blogs/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockBlog);
    expect(Blog.findByPk).toHaveBeenCalledWith('1');
  });

  it('should return 404 if blog not found', async () => {
    Blog.findByPk.mockResolvedValue(null);

    const res = await request(app)
      .get('/api/blogs/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Blog not found');
  });

  it('should delete a blog by ID', async () => {
    Blog.destroy.mockResolvedValue(1);

    const res = await request(app)
      .delete('/api/blogs/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Blog deleted successfully');
    expect(Blog.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});