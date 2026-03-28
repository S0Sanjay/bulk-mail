import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";
import History from "./History";

const BACKEND_URL = "https://bulk-mail-livid.vercel.app";

function App() {
  const [subject, setsubject] = useState("");
  const [msg, setmsg] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [status, setstatus] = useState(false);
  const [resultMsg, setresultMsg] = useState("");
  const [showHistory, setshowHistory] = useState(false);

  function handlesubject(evt) {
    setsubject(evt.target.value);
  }

  function handlemsg(evt) {
    setmsg(evt.target.value);
  }

  function handlefile(event) {
    const file = event.target.files[0];
    console.log(file);

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emailData = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
      const totalemail = emailData.map(function (item) {
        return item.A;
      });
      console.log(totalemail);
      setEmailList(totalemail);
    };
    reader.readAsBinaryString(file);
  }

  function send() {
    if (!subject || !msg || emailList.length === 0) {
      setresultMsg("Please fill subject, message and upload an email list!");
      return;
    }

    setstatus(true);
    setresultMsg("");

    axios
      .post(BACKEND_URL + "/sendemail", {
        subject: subject,
        message: msg,
        emailList: emailList,
      })
      .then(function (data) {
        console.log(data.data);
        if (data.data.success === true) {
          setresultMsg("Emails Sent Successfully!");
          setstatus(false);
          setsubject("");
          setmsg("");
          setEmailList([]);
        } else {
          setresultMsg("Failed to send emails. Try again!");
          setstatus(false);
        }
      })
      .catch(function (err) {
        console.log("Error:", err);
        setresultMsg("Something went wrong!");
        setstatus(false);
      });
  }

  return (
    <div>
      {}
      <div className="bg-blue-950 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">
          Send bulk emails to multiple people at once using an Excel file
        </h1>
      </div>

      {}
      <div className="bg-blue-600 text-white text-center flex justify-center gap-4 py-2">
        <button
          onClick={() => setshowHistory(false)}
          className={`px-4 py-1 rounded-md font-medium ${!showHistory ? "bg-white text-blue-900" : "text-white"}`}
        >
          Send Mail
        </button>
        <button
          onClick={() => setshowHistory(true)}
          className={`px-4 py-1 rounded-md font-medium ${showHistory ? "bg-white text-blue-900" : "text-white"}`}
        >
          History
        </button>
      </div>

      {}
      {showHistory ? (
        <History backendUrl={BACKEND_URL} />
      ) : (
        <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-5 min-h-screen">

          {}
          <input
            type="text"
            onChange={handlesubject}
            value={subject}
            className="w-[80%] py-2 px-2 outline-none border border-black rounded-md mb-3 bg-white"
            placeholder="Enter email subject..."
          />

          {}
          <textarea
            onChange={handlemsg}
            value={msg}
            className="w-[80%] h-32 py-2 outline-none px-2 border border-black rounded-md bg-white"
            placeholder="Enter the email text...."
          ></textarea>

          {}
          <div className="mt-4 text-center">
            <p className="mb-2 font-medium">Upload Excel file with email list (.xlsx)</p>
            <input
              type="file"
              onChange={handlefile}
              accept=".xlsx,.xls"
              className="border-4 border-dashed border-black py-4 px-4 bg-white"
            />
          </div>

          <p className="mt-3 font-medium">
            Total Emails in the file: {emailList.length}
          </p>

          {}
          {resultMsg && (
            <p className={`mt-3 font-medium px-4 py-2 rounded-md ${resultMsg.includes("Successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {resultMsg}
            </p>
          )}

          <button
            onClick={send}
            className="mt-4 bg-blue-950 py-2 px-6 text-white font-medium rounded-md"
          >
            {status ? "Sending..." : "Send"}
          </button>
        </div>
      )}

      <div className="bg-blue-300 text-white text-center p-8"></div>
      <div className="bg-blue-200 text-white text-center p-8"></div>
    </div>
  );
}

export default App;