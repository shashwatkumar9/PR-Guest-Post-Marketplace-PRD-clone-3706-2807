import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSend, FiPaperclip, FiSearch, FiMoreVertical } = FiIcons;

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0ea5e9&color=fff',
      lastMessage: 'Thanks for the quick turnaround on the article!',
      time: '2 hours ago',
      unread: 2,
      status: 'online'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff',
      lastMessage: 'I have a few revisions for the content...',
      time: '1 day ago',
      unread: 0,
      status: 'offline'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=f59e0b&color=fff',
      lastMessage: 'When can we expect the article to go live?',
      time: '2 days ago',
      unread: 1,
      status: 'online'
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      text: 'Hi! I just placed an order for a guest post on your tech blog. Looking forward to working with you!',
      time: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      senderId: 'me',
      text: 'Hello! Thank you for your order. I received it and will review your content guidelines. What topic would you like to cover?',
      time: '10:45 AM',
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      text: 'I\'d like to write about "The Future of AI in Web Development". I can have the draft ready by tomorrow.',
      time: '11:00 AM',
      isOwn: false
    },
    {
      id: 4,
      senderId: 'me',
      text: 'Perfect! That sounds like a great topic for our audience. Please make sure to include practical examples and keep it around 1200-1500 words.',
      time: '11:15 AM',
      isOwn: true
    },
    {
      id: 5,
      senderId: 1,
      text: 'Thanks for the quick turnaround on the article!',
      time: '2:30 PM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message to API
      setNewMessage('');
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with buyers and publishers</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer ${
                      selectedConversation === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-10 h-10 rounded-full"
                        />
                        {conversation.status === 'online' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </p>
                          <p className="text-xs text-gray-500">{conversation.time}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConv.avatar}
                        alt={selectedConv.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{selectedConv.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConv.status === 'online' ? 'Online' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <SafeIcon icon={FiMoreVertical} className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <SafeIcon icon={FiPaperclip} className="h-5 w-5" />
                      </button>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a message..."
                          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <SafeIcon icon={FiSend} className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-gray-400 mb-4">
                      <SafeIcon icon={FiSend} className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;