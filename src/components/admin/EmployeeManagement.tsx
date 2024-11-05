import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Camera, MapPin, Battery, Signal, Search, Filter } from 'lucide-react';
import { Employee, getEmployees, addEmployee, updateEmployee } from '../../services/firestore';

function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
    name: '',
    email: '',
    role: 'operator',
    status: 'active',
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await addEmployee(newEmployee);
      await loadEmployees();
      setIsModalOpen(false);
      setNewEmployee({
        name: '',
        email: '',
        role: 'operator',
        status: 'active',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'inactive':
        return 'text-red-400';
      case 'on_leave':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestione Dipendenti</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cerca dipendenti..."
              className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
            <Filter className="w-4 h-4" />
            Filtri
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Nuovo Dipendente
          </button>
        </div>
      </div>

      {/* Employee List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className={`bg-slate-800 rounded-lg p-6 cursor-pointer transition-colors ${
                selectedEmployee?.id === employee.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedEmployee(employee)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-white">{employee.name}</h3>
                    <span className={`text-sm ${getStatusColor(employee.status)}`}>●</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-300">{employee.email}</p>
                    <p className="text-gray-300 capitalize">{employee.role.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Employee Details */}
        <div className="bg-slate-800 rounded-lg p-6">
          {selectedEmployee ? (
            <>
              <h3 className="text-xl font-bold text-white mb-6">Dettagli Dipendente</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
                  <p className="text-white">{selectedEmployee.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <p className="text-white">{selectedEmployee.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ruolo</label>
                  <p className="text-white capitalize">{selectedEmployee.role.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <p className={`${getStatusColor(selectedEmployee.status)} capitalize`}>
                    {selectedEmployee.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Seleziona un dipendente per visualizzare i dettagli
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-6">Nuovo Dipendente</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ruolo</label>
                <select
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value as 'team_leader' | 'operator' })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="operator">Operatore</option>
                  <option value="team_leader">Team Leader</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Aggiungi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;