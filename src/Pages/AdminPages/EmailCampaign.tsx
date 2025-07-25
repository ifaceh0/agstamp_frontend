import { useState } from 'react';
import { useGetAllSubscribersQuery, useSendMailToSubscribersMutation } from '../../Redux/Api/adminApi';
import { toast } from 'react-toastify';
import FullscreenLoader from '../../Components/Loader/FullscreenLoader';

const EmailCampaign = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sendMailToSubscribers,{isLoading}] = useSendMailToSubscribersMutation();

    const {data} = useGetAllSubscribersQuery();

  // Handle individual checkbox change
  const handleCheckboxChange = (email: string) => {
    setSelectedSubscribers(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email) 
        : [...prev, email]
    );
  };

  // Handle select all checkbox
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers( data ? data.subscribers.map(sub => sub.subscribedEmail) : []);
    }
    setSelectAll(!selectAll);
  };

  // Handle send email
  const handleSendEmail = async() => {
    const {data} = await sendMailToSubscribers({
        selectedSubscribers,
        subject,
        message
    });
    if(data){
        toast.success(data.message);
        setSubject("")
        setMessage("")
        setSelectedSubscribers([])
        setSelectAll(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {isLoading && <FullscreenLoader/>}
      <h1 className="text-2xl font-bold mb-6">Email Campaign</h1>
      
      {/* Subject Input */}
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter email subject"
        />
      </div>
      
      {/* Message Input */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          rows={5}
          placeholder="Enter your email message"
        ></textarea>
      </div>
      
      {/* Subscribers Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscribers
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.subscribers.map((subscriber) => (
              <tr key={subscriber._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedSubscribers.includes(subscriber.subscribedEmail)}
                    onChange={() => handleCheckboxChange(subscriber.subscribedEmail)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subscriber.subscribedEmail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSendEmail}
          disabled={selectedSubscribers.length === 0 || !subject || !message}
          className={`px-4 py-2 rounded-md text-white ${
            selectedSubscribers.length === 0 || !subject || !message
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default EmailCampaign;