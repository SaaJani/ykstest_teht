import { describe, it, expect, beforeEach } from 'vitest';

// Simple task manager with actual logic to test
let tasks = [];
let nextId = 1;

function createTask(payload) {
  if (!payload.topic || payload.topic.trim() === '') {
    throw new Error('Topic is required');
  }

  const task = {
    id: nextId++,
    topic: payload.topic.trim(),
    priority: payload.priority || 'medium',
    status: payload.status || 'todo',
    description: payload.description?.trim() || '',
    completed: payload.status === 'done',
  };

  tasks.push(task);
  return task;
}

function getTasks() {
  return tasks;
}

function updateTask(id, updates) {
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error('Task not found');

  if (updates.topic !== undefined) task.topic = updates.topic;
  if (updates.priority !== undefined) task.priority = updates.priority;
  if (updates.status !== undefined) {
    task.status = updates.status;
    if (updates.status === 'done') task.completed = true;
  }
  if (updates.description !== undefined) task.description = updates.description;

  return task;
}

function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error('Task not found');

  tasks.splice(idx, 1);
}

// Tests
beforeEach(() => {
  tasks = [];
  nextId = 1;
});

describe('Create Task', () => {
  it('should create a task with valid input', () => {
    const task = createTask({ topic: 'Test Task', priority: 'high' });

    expect(task.topic).toBe('Test Task');
    expect(task.priority).toBe('high');
    expect(tasks).toHaveLength(1);
  });

  it('should enforce required fields - topic is required', () => {
    expect(() => createTask({ priority: 'high' })).toThrow('Topic is required');
    expect(() => createTask({ topic: '' })).toThrow('Topic is required');
  });

  it('should apply default values when optional fields are missing', () => {
    const task = createTask({ topic: 'Minimal Task' });

    expect(task.priority).toBe('medium');
    expect(task.status).toBe('todo');
    expect(task.completed).toBe(false);
  });

  it('should set completed to true when status is done', () => {
    const task = createTask({ topic: 'Done Task', status: 'done' });

    expect(task.completed).toBe(true);
  });
});

describe('Read/List Tasks', () => {
  it('should return empty array when no tasks exist', () => {
    expect(getTasks()).toEqual([]);
  });

  it('should return all created tasks', () => {
    createTask({ topic: 'Task 1' });
    createTask({ topic: 'Task 2' });

    expect(getTasks()).toHaveLength(2);
  });
});

describe('Update Task', () => {
  it('should update only intended fields', () => {
    const task = createTask({
      topic: 'Original',
      priority: 'low',
      description: 'Desc',
    });

    updateTask(task.id, { topic: 'Updated' });

    expect(task.topic).toBe('Updated');
    expect(task.priority).toBe('low');
    expect(task.description).toBe('Desc');
  });

  it('should set completed to true when status changes to done', () => {
    const task = createTask({ topic: 'Task', status: 'todo' });

    updateTask(task.id, { status: 'done' });

    expect(task.completed).toBe(true);
  });
});

describe('Delete Task', () => {
  it('should remove a task when deleted', () => {
    const task = createTask({ topic: 'To Delete' });

    deleteTask(task.id);

    expect(getTasks()).toHaveLength(0);
  });

  it('should only delete the specified task', () => {
    createTask({ topic: 'Task 1' });
    const task2 = createTask({ topic: 'Task 2' });

    deleteTask(1);

    expect(getTasks()).toHaveLength(1);
    expect(getTasks()[0].id).toBe(task2.id);
  });
});
