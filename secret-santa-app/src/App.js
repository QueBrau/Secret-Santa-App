import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Gift, UserPlus, Trash2, Users, Shuffle, Mail } from 'lucide-react';

export default function SecretSantaApp() {
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [showAssignments, setShowAssignments] = useState(false);

  const addParticipant = () => {
    if (name.trim() && phone.trim()) {
      setParticipants([...participants, { id: Date.now(), name: name.trim(), phone: phone.trim() }]);
      setName('');
      setPhone('');
    }
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
    setAssignments([]);
    setShowAssignments(false);
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateAssignments = () => {
    if (participants.length < 2) {
      alert('You need at least 2 participants!');
      return;
    }

    let givers = [...participants];
    let receivers = [...participants];
    let valid = false;
    let newAssignments = [];
    let attempts = 0;
    const maxAttempts = 100;

    while (!valid && attempts < maxAttempts) {
      givers = shuffleArray(participants);
      receivers = shuffleArray(participants);
      valid = true;
      newAssignments = [];

      for (let i = 0; i < givers.length; i++) {
        if (givers[i].id === receivers[i].id) {
          valid = false;
          break;
        }
        newAssignments.push({
          giver: givers[i],
          receiver: receivers[i]
        });
      }
      attempts++;
    }

    if (valid) {
      setAssignments(newAssignments);
      setShowAssignments(true);
    } else {
      alert('Could not generate valid assignments. Please try again.');
    }
  };

  const copyAssignment = (assignment) => {
    const message = `🎅 Secret Santa Assignment 🎁\n\nHi ${assignment.giver.name}!\n\nYou are the Secret Santa for: ${assignment.receiver.name}\n\nKeep it secret! 🤫`;
    navigator.clipboard.writeText(message);
    alert('Assignment copied to clipboard! You can now text it manually.');
  };

  const exportAllAssignments = () => {
    const allMessages = assignments.map(a => 
      `To: ${a.giver.phone}\nMessage: Hi ${a.giver.name}! You are the Secret Santa for: ${a.receiver.name}`
    ).join('\n\n---\n\n');
    
    navigator.clipboard.writeText(allMessages);
    alert('All assignments copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-12 h-12 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-800">Secret Santa Organizer</h1>
          </div>
          <p className="text-gray-600">Add participants and generate secret assignments</p>
        </div>

        {/* Add Participant Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add Participant
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone (e.g., 555-0123)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              onClick={addParticipant}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Participants List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Participants ({participants.length})
          </h2>
          {participants.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No participants yet. Add some above!</p>
          ) : (
            <div className="space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">{participant.name}</p>
                    <p className="text-sm text-gray-500">{participant.phone}</p>
                  </div>
                  <button
                    onClick={() => removeParticipant(participant.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generate Button */}
        {participants.length >= 2 && !showAssignments && (
          <button
            onClick={generateAssignments}
            className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <Shuffle className="w-6 h-6" />
            Generate Secret Santa Assignments
          </button>
        )}

        {/* Assignments */}
        {showAssignments && assignments.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Assignments Generated
              </h2>
              <button
                onClick={exportAllAssignments}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Copy All
              </button>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Click "Copy" to copy each assignment message to your clipboard, 
                then manually send it via text. For automated texting, you'll need to integrate with a 
                service like Twilio.
              </p>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-gray-700">
                        <span className="font-semibold">{assignment.giver.name}</span>
                        <span className="mx-2">→</span>
                        <span className="font-semibold text-green-700">{assignment.receiver.name}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Send to: {assignment.giver.phone}</p>
                    </div>
                    <button
                      onClick={() => copyAssignment(assignment)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setAssignments([]);
                setShowAssignments(false);
              }}
              className="w-full mt-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Generate New Assignments
            </button>
          </div>
        )}
      </div>
    </div>
  );
}