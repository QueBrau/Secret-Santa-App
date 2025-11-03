import React, { useState } from 'react';
import { Gift, UserPlus, Trash2, Users, Shuffle, Mail } from 'lucide-react';
import './App.css';

export default function App() {
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [showAssignments, setShowAssignments] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResults, setSendResults] = useState(null);

  const addParticipant = () => {
    if (name.trim() && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        alert('Please enter a valid email address');
        return;
      }
      
      setParticipants([...participants, { 
        id: Date.now(), 
        name: name.trim(), 
        email: email.trim()
      }]);
      setName('');
      setEmail('');
    } else {
      alert('Please fill in both name and email');
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

  const sendViaEmail = async () => {
    if (!assignments || assignments.length === 0) {
      alert('No assignments to send');
      return;
    }

    setSending(true);
    setSendResults(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/send-assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignments }),
      });

      const data = await response.json();

      if (data.success) {
        setSendResults(data);
        alert(`Successfully sent ${data.sent} messages${data.failed > 0 ? `\n${data.failed} failed` : ''}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending messages:', error);
      alert('Failed to connect to server. Please try again later.');
    } finally {
      setSending(false);
    }
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
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                    <p className="text-sm text-gray-500">{participant.email}</p>
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
                onClick={sendViaEmail}
                disabled={sending}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send via Email'}
              </button>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <div className="text-center">
                <div className="text-4xl mb-3">✓</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Assignments Generated Successfully
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {assignments.length} Secret Santa assignments have been created.
                </p>
                <p className="text-sm text-gray-500">
                  Assignments are hidden to keep the secret. Use the buttons above to send them out.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Email Delivery:</strong> Click "Send via Email" above to automatically email all participants their Secret Santa assignments. 
                The assignments are kept secret - only the recipients will see who they're buying for.
              </p>
            </div>

            {sendResults && (
              <div className={`border rounded-lg p-4 mb-4 ${sendResults.failed === 0 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <p className="text-sm font-semibold mb-2">
                  Sent: {sendResults.sent} | Failed: {sendResults.failed}
                </p>
                {sendResults.errors && sendResults.errors.length > 0 && (
                  <div className="text-xs text-red-700 mt-2">
                    <p className="font-semibold">Errors:</p>
                    {sendResults.errors.map((err, idx) => (
                      <p key={idx}>{err.giver}: {err.error}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

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