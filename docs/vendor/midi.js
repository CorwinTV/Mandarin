var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// node_modules/@tonejs/midi/build/Midi.js
var require_Midi = __commonJS({
  "node_modules/@tonejs/midi/build/Midi.js"(exports, module) {
    !(function(t, e) {
      if ("object" == typeof exports && "object" == typeof module) module.exports = e();
      else if ("function" == typeof define && define.amd) define([], e);
      else {
        var r = e();
        for (var n in r) ("object" == typeof exports ? exports : t)[n] = r[n];
      }
    })("undefined" != typeof self ? self : exports, (function() {
      return (() => {
        var t = { 507: (t2, e2, r2) => {
          "use strict";
          function n(t3) {
            var e3 = [];
            return i(t3, e3), e3;
          }
          function i(t3, e3) {
            for (var r3 = 0; r3 < t3.length; r3++) {
              var n2 = t3[r3];
              Array.isArray(n2) ? i(n2, e3) : e3.push(n2);
            }
          }
          r2.r(e2), r2.d(e2, { flatten: () => n });
        }, 289: (t2, e2, r2) => {
          e2.parseMidi = r2(666), e2.writeMidi = r2(865);
        }, 666: (t2) => {
          function e2(t3) {
            for (var e3, n = new r2(t3), i = []; !n.eof(); ) {
              var a = o();
              i.push(a);
            }
            return i;
            function o() {
              var t4 = {};
              t4.deltaTime = n.readVarInt();
              var r3 = n.readUInt8();
              if (240 == (240 & r3)) {
                if (255 !== r3) {
                  if (240 == r3) return t4.type = "sysEx", a2 = n.readVarInt(), t4.data = n.readBytes(a2), t4;
                  if (247 == r3) return t4.type = "endSysEx", a2 = n.readVarInt(), t4.data = n.readBytes(a2), t4;
                  throw "Unrecognised MIDI event type byte: " + r3;
                }
                t4.meta = true;
                var i2 = n.readUInt8(), a2 = n.readVarInt();
                switch (i2) {
                  case 0:
                    if (t4.type = "sequenceNumber", 2 !== a2) throw "Expected length for sequenceNumber event is 2, got " + a2;
                    return t4.number = n.readUInt16(), t4;
                  case 1:
                    return t4.type = "text", t4.text = n.readString(a2), t4;
                  case 2:
                    return t4.type = "copyrightNotice", t4.text = n.readString(a2), t4;
                  case 3:
                    return t4.type = "trackName", t4.text = n.readString(a2), t4;
                  case 4:
                    return t4.type = "instrumentName", t4.text = n.readString(a2), t4;
                  case 5:
                    return t4.type = "lyrics", t4.text = n.readString(a2), t4;
                  case 6:
                    return t4.type = "marker", t4.text = n.readString(a2), t4;
                  case 7:
                    return t4.type = "cuePoint", t4.text = n.readString(a2), t4;
                  case 32:
                    if (t4.type = "channelPrefix", 1 != a2) throw "Expected length for channelPrefix event is 1, got " + a2;
                    return t4.channel = n.readUInt8(), t4;
                  case 33:
                    if (t4.type = "portPrefix", 1 != a2) throw "Expected length for portPrefix event is 1, got " + a2;
                    return t4.port = n.readUInt8(), t4;
                  case 47:
                    if (t4.type = "endOfTrack", 0 != a2) throw "Expected length for endOfTrack event is 0, got " + a2;
                    return t4;
                  case 81:
                    if (t4.type = "setTempo", 3 != a2) throw "Expected length for setTempo event is 3, got " + a2;
                    return t4.microsecondsPerBeat = n.readUInt24(), t4;
                  case 84:
                    if (t4.type = "smpteOffset", 5 != a2) throw "Expected length for smpteOffset event is 5, got " + a2;
                    var o2 = n.readUInt8();
                    return t4.frameRate = { 0: 24, 32: 25, 64: 29, 96: 30 }[96 & o2], t4.hour = 31 & o2, t4.min = n.readUInt8(), t4.sec = n.readUInt8(), t4.frame = n.readUInt8(), t4.subFrame = n.readUInt8(), t4;
                  case 88:
                    if (t4.type = "timeSignature", 4 != a2) throw "Expected length for timeSignature event is 4, got " + a2;
                    return t4.numerator = n.readUInt8(), t4.denominator = 1 << n.readUInt8(), t4.metronome = n.readUInt8(), t4.thirtyseconds = n.readUInt8(), t4;
                  case 89:
                    if (t4.type = "keySignature", 2 != a2) throw "Expected length for keySignature event is 2, got " + a2;
                    return t4.key = n.readInt8(), t4.scale = n.readUInt8(), t4;
                  case 127:
                    return t4.type = "sequencerSpecific", t4.data = n.readBytes(a2), t4;
                  default:
                    return t4.type = "unknownMeta", t4.data = n.readBytes(a2), t4.metatypeByte = i2, t4;
                }
              } else {
                var s;
                if (0 == (128 & r3)) {
                  if (null === e3) throw "Running status byte encountered before status byte";
                  s = r3, r3 = e3, t4.running = true;
                } else s = n.readUInt8(), e3 = r3;
                var c = r3 >> 4;
                switch (t4.channel = 15 & r3, c) {
                  case 8:
                    return t4.type = "noteOff", t4.noteNumber = s, t4.velocity = n.readUInt8(), t4;
                  case 9:
                    var u = n.readUInt8();
                    return t4.type = 0 === u ? "noteOff" : "noteOn", t4.noteNumber = s, t4.velocity = u, 0 === u && (t4.byte9 = true), t4;
                  case 10:
                    return t4.type = "noteAftertouch", t4.noteNumber = s, t4.amount = n.readUInt8(), t4;
                  case 11:
                    return t4.type = "controller", t4.controllerType = s, t4.value = n.readUInt8(), t4;
                  case 12:
                    return t4.type = "programChange", t4.programNumber = s, t4;
                  case 13:
                    return t4.type = "channelAftertouch", t4.amount = s, t4;
                  case 14:
                    return t4.type = "pitchBend", t4.value = s + (n.readUInt8() << 7) - 8192, t4;
                  default:
                    throw "Unrecognised MIDI event type: " + c;
                }
              }
            }
          }
          function r2(t3) {
            this.buffer = t3, this.bufferLen = this.buffer.length, this.pos = 0;
          }
          r2.prototype.eof = function() {
            return this.pos >= this.bufferLen;
          }, r2.prototype.readUInt8 = function() {
            var t3 = this.buffer[this.pos];
            return this.pos += 1, t3;
          }, r2.prototype.readInt8 = function() {
            var t3 = this.readUInt8();
            return 128 & t3 ? t3 - 256 : t3;
          }, r2.prototype.readUInt16 = function() {
            return (this.readUInt8() << 8) + this.readUInt8();
          }, r2.prototype.readInt16 = function() {
            var t3 = this.readUInt16();
            return 32768 & t3 ? t3 - 65536 : t3;
          }, r2.prototype.readUInt24 = function() {
            return (this.readUInt8() << 16) + (this.readUInt8() << 8) + this.readUInt8();
          }, r2.prototype.readInt24 = function() {
            var t3 = this.readUInt24();
            return 8388608 & t3 ? t3 - 16777216 : t3;
          }, r2.prototype.readUInt32 = function() {
            return (this.readUInt8() << 24) + (this.readUInt8() << 16) + (this.readUInt8() << 8) + this.readUInt8();
          }, r2.prototype.readBytes = function(t3) {
            var e3 = this.buffer.slice(this.pos, this.pos + t3);
            return this.pos += t3, e3;
          }, r2.prototype.readString = function(t3) {
            var e3 = this.readBytes(t3);
            return String.fromCharCode.apply(null, e3);
          }, r2.prototype.readVarInt = function() {
            for (var t3 = 0; !this.eof(); ) {
              var e3 = this.readUInt8();
              if (!(128 & e3)) return t3 + e3;
              t3 += 127 & e3, t3 <<= 7;
            }
            return t3;
          }, r2.prototype.readChunk = function() {
            var t3 = this.readString(4), e3 = this.readUInt32();
            return { id: t3, length: e3, data: this.readBytes(e3) };
          }, t2.exports = function(t3) {
            var n = new r2(t3), i = n.readChunk();
            if ("MThd" != i.id) throw "Bad MIDI file.  Expected 'MHdr', got: '" + i.id + "'";
            for (var a = (function(t4) {
              var e3 = new r2(t4), n2 = { format: e3.readUInt16(), numTracks: e3.readUInt16() }, i2 = e3.readUInt16();
              return 32768 & i2 ? (n2.framesPerSecond = 256 - (i2 >> 8), n2.ticksPerFrame = 255 & i2) : n2.ticksPerBeat = i2, n2;
            })(i.data), o = [], s = 0; !n.eof() && s < a.numTracks; s++) {
              var c = n.readChunk();
              if ("MTrk" != c.id) throw "Bad MIDI file.  Expected 'MTrk', got: '" + c.id + "'";
              var u = e2(c.data);
              o.push(u);
            }
            return { header: a, tracks: o };
          };
        }, 865: (t2) => {
          function e2(t3, e3, i) {
            var a, o = new n(), s = e3.length, c = null;
            for (a = 0; a < s; a++) false !== i.running && (i.running || e3[a].running) || (c = null), c = r2(o, e3[a], c, i.useByte9ForNoteOff);
            t3.writeChunk("MTrk", o.buffer);
          }
          function r2(t3, e3, r3, n2) {
            var i = e3.type, a = e3.deltaTime, o = e3.text || "", s = e3.data || [], c = null;
            switch (t3.writeVarInt(a), i) {
              case "sequenceNumber":
                t3.writeUInt8(255), t3.writeUInt8(0), t3.writeVarInt(2), t3.writeUInt16(e3.number);
                break;
              case "text":
                t3.writeUInt8(255), t3.writeUInt8(1), t3.writeVarInt(o.length), t3.writeString(o);
                break;
              case "copyrightNotice":
                t3.writeUInt8(255), t3.writeUInt8(2), t3.writeVarInt(o.length), t3.writeString(o);
                break;
              case "trackName":
                t3.writeUInt8(255), t3.writeUInt8(3), t3.writeVarInt(o.length), t3.writeString(o);
                break;
              case "instrumentName":
                t3.writeUInt8(255), t3.writeUInt8(4), t3.writeVarInt(o.length), t3.writeString(o);
                break;
              case "lyrics":
                t3.writeUInt8(255), t3.writeUInt8(5), t3.writeVarInt(o.length), t3.writeString(o);
                break;
              case "marker":
                t3.writeUInt8(255), t3.writeUInt8(6), t3.writeVarInt(o.length), t3.writeString(o);
                break;
              case "cuePoint":
                t3.writeUInt8(255), t3.writeUInt8(7), t3.writeVarInt(o.length), t3.writeString(o);
                break;
              case "channelPrefix":
                t3.writeUInt8(255), t3.writeUInt8(32), t3.writeVarInt(1), t3.writeUInt8(e3.channel);
                break;
              case "portPrefix":
                t3.writeUInt8(255), t3.writeUInt8(33), t3.writeVarInt(1), t3.writeUInt8(e3.port);
                break;
              case "endOfTrack":
                t3.writeUInt8(255), t3.writeUInt8(47), t3.writeVarInt(0);
                break;
              case "setTempo":
                t3.writeUInt8(255), t3.writeUInt8(81), t3.writeVarInt(3), t3.writeUInt24(e3.microsecondsPerBeat);
                break;
              case "smpteOffset":
                t3.writeUInt8(255), t3.writeUInt8(84), t3.writeVarInt(5);
                var u = 31 & e3.hour | { 24: 0, 25: 32, 29: 64, 30: 96 }[e3.frameRate];
                t3.writeUInt8(u), t3.writeUInt8(e3.min), t3.writeUInt8(e3.sec), t3.writeUInt8(e3.frame), t3.writeUInt8(e3.subFrame);
                break;
              case "timeSignature":
                t3.writeUInt8(255), t3.writeUInt8(88), t3.writeVarInt(4), t3.writeUInt8(e3.numerator);
                var h = 255 & Math.floor(Math.log(e3.denominator) / Math.LN2);
                t3.writeUInt8(h), t3.writeUInt8(e3.metronome), t3.writeUInt8(e3.thirtyseconds || 8);
                break;
              case "keySignature":
                t3.writeUInt8(255), t3.writeUInt8(89), t3.writeVarInt(2), t3.writeInt8(e3.key), t3.writeUInt8(e3.scale);
                break;
              case "sequencerSpecific":
                t3.writeUInt8(255), t3.writeUInt8(127), t3.writeVarInt(s.length), t3.writeBytes(s);
                break;
              case "unknownMeta":
                null != e3.metatypeByte && (t3.writeUInt8(255), t3.writeUInt8(e3.metatypeByte), t3.writeVarInt(s.length), t3.writeBytes(s));
                break;
              case "sysEx":
                t3.writeUInt8(240), t3.writeVarInt(s.length), t3.writeBytes(s);
                break;
              case "endSysEx":
                t3.writeUInt8(247), t3.writeVarInt(s.length), t3.writeBytes(s);
                break;
              case "noteOff":
                (c = (false !== n2 && e3.byte9 || n2 && 0 == e3.velocity ? 144 : 128) | e3.channel) !== r3 && t3.writeUInt8(c), t3.writeUInt8(e3.noteNumber), t3.writeUInt8(e3.velocity);
                break;
              case "noteOn":
                (c = 144 | e3.channel) !== r3 && t3.writeUInt8(c), t3.writeUInt8(e3.noteNumber), t3.writeUInt8(e3.velocity);
                break;
              case "noteAftertouch":
                (c = 160 | e3.channel) !== r3 && t3.writeUInt8(c), t3.writeUInt8(e3.noteNumber), t3.writeUInt8(e3.amount);
                break;
              case "controller":
                (c = 176 | e3.channel) !== r3 && t3.writeUInt8(c), t3.writeUInt8(e3.controllerType), t3.writeUInt8(e3.value);
                break;
              case "programChange":
                (c = 192 | e3.channel) !== r3 && t3.writeUInt8(c), t3.writeUInt8(e3.programNumber);
                break;
              case "channelAftertouch":
                (c = 208 | e3.channel) !== r3 && t3.writeUInt8(c), t3.writeUInt8(e3.amount);
                break;
              case "pitchBend":
                (c = 224 | e3.channel) !== r3 && t3.writeUInt8(c);
                var f = 8192 + e3.value, p = 127 & f, l = f >> 7 & 127;
                t3.writeUInt8(p), t3.writeUInt8(l);
                break;
              default:
                throw "Unrecognized event type: " + i;
            }
            return c;
          }
          function n() {
            this.buffer = [];
          }
          n.prototype.writeUInt8 = function(t3) {
            this.buffer.push(255 & t3);
          }, n.prototype.writeInt8 = n.prototype.writeUInt8, n.prototype.writeUInt16 = function(t3) {
            var e3 = t3 >> 8 & 255, r3 = 255 & t3;
            this.writeUInt8(e3), this.writeUInt8(r3);
          }, n.prototype.writeInt16 = n.prototype.writeUInt16, n.prototype.writeUInt24 = function(t3) {
            var e3 = t3 >> 16 & 255, r3 = t3 >> 8 & 255, n2 = 255 & t3;
            this.writeUInt8(e3), this.writeUInt8(r3), this.writeUInt8(n2);
          }, n.prototype.writeInt24 = n.prototype.writeUInt24, n.prototype.writeUInt32 = function(t3) {
            var e3 = t3 >> 24 & 255, r3 = t3 >> 16 & 255, n2 = t3 >> 8 & 255, i = 255 & t3;
            this.writeUInt8(e3), this.writeUInt8(r3), this.writeUInt8(n2), this.writeUInt8(i);
          }, n.prototype.writeInt32 = n.prototype.writeUInt32, n.prototype.writeBytes = function(t3) {
            this.buffer = this.buffer.concat(Array.prototype.slice.call(t3, 0));
          }, n.prototype.writeString = function(t3) {
            var e3, r3 = t3.length, n2 = [];
            for (e3 = 0; e3 < r3; e3++) n2.push(t3.codePointAt(e3));
            this.writeBytes(n2);
          }, n.prototype.writeVarInt = function(t3) {
            if (t3 < 0) throw "Cannot write negative variable-length integer";
            if (t3 <= 127) this.writeUInt8(t3);
            else {
              var e3 = t3, r3 = [];
              for (r3.push(127 & e3), e3 >>= 7; e3; ) {
                var n2 = 127 & e3 | 128;
                r3.push(n2), e3 >>= 7;
              }
              this.writeBytes(r3.reverse());
            }
          }, n.prototype.writeChunk = function(t3, e3) {
            this.writeString(t3), this.writeUInt32(e3.length), this.writeBytes(e3);
          }, t2.exports = function(t3, r3) {
            if ("object" != typeof t3) throw "Invalid MIDI data";
            r3 = r3 || {};
            var i, a = t3.header || {}, o = t3.tracks || [], s = o.length, c = new n();
            for ((function(t4, e3, r4) {
              var i2 = null == e3.format ? 1 : e3.format, a2 = 128;
              e3.timeDivision ? a2 = e3.timeDivision : e3.ticksPerFrame && e3.framesPerSecond ? a2 = -(255 & e3.framesPerSecond) << 8 | 255 & e3.ticksPerFrame : e3.ticksPerBeat && (a2 = 32767 & e3.ticksPerBeat);
              var o2 = new n();
              o2.writeUInt16(i2), o2.writeUInt16(r4), o2.writeUInt16(a2), t4.writeChunk("MThd", o2.buffer);
            })(c, a, s), i = 0; i < s; i++) e2(c, o[i], r3);
            return c.buffer;
          };
        }, 805: (t2, e2) => {
          "use strict";
          function r2(t3, e3, r3) {
            void 0 === r3 && (r3 = "ticks");
            var n = 0, i = t3.length, a = i;
            if (i > 0 && t3[i - 1][r3] <= e3) return i - 1;
            for (; n < a; ) {
              var o = Math.floor(n + (a - n) / 2), s = t3[o], c = t3[o + 1];
              if (s[r3] === e3) {
                for (var u = o; u < t3.length; u++) t3[u][r3] === e3 && (o = u);
                return o;
              }
              if (s[r3] < e3 && c[r3] > e3) return o;
              s[r3] > e3 ? a = o : s[r3] < e3 && (n = o + 1);
            }
            return -1;
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.insert = e2.search = void 0, e2.search = r2, e2.insert = function(t3, e3, n) {
            if (void 0 === n && (n = "ticks"), t3.length) {
              var i = r2(t3, e3[n], n);
              t3.splice(i + 1, 0, e3);
            } else t3.push(e3);
          };
        }, 543: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.ControlChange = e2.controlChangeIds = e2.controlChangeNames = void 0, e2.controlChangeNames = { 1: "modulationWheel", 2: "breath", 4: "footController", 5: "portamentoTime", 7: "volume", 8: "balance", 10: "pan", 64: "sustain", 65: "portamentoTime", 66: "sostenuto", 67: "softPedal", 68: "legatoFootswitch", 84: "portamentoControl" }, e2.controlChangeIds = Object.keys(e2.controlChangeNames).reduce((function(t3, r3) {
            return t3[e2.controlChangeNames[r3]] = r3, t3;
          }), {});
          var r2 = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), i = (function() {
            function t3(t4, e3) {
              r2.set(this, e3), n.set(this, t4.controllerType), this.ticks = t4.absoluteTime, this.value = t4.value;
            }
            return Object.defineProperty(t3.prototype, "number", { get: function() {
              return n.get(this);
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "name", { get: function() {
              return e2.controlChangeNames[this.number] ? e2.controlChangeNames[this.number] : null;
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "time", { get: function() {
              return r2.get(this).ticksToSeconds(this.ticks);
            }, set: function(t4) {
              var e3 = r2.get(this);
              this.ticks = e3.secondsToTicks(t4);
            }, enumerable: false, configurable: true }), t3.prototype.toJSON = function() {
              return { number: this.number, ticks: this.ticks, time: this.time, value: this.value };
            }, t3;
          })();
          e2.ControlChange = i;
        }, 906: (t2, e2, r2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.createControlChanges = void 0;
          var n = r2(543);
          e2.createControlChanges = function() {
            return new Proxy({}, { get: function(t3, e3) {
              return t3[e3] ? t3[e3] : n.controlChangeIds.hasOwnProperty(e3) ? t3[n.controlChangeIds[e3]] : void 0;
            }, set: function(t3, e3, r3) {
              return n.controlChangeIds.hasOwnProperty(e3) ? t3[n.controlChangeIds[e3]] = r3 : t3[e3] = r3, true;
            } });
          };
        }, 54: function(t2, e2, r2) {
          "use strict";
          var n = this && this.__spreadArray || function(t3, e3, r3) {
            if (r3 || 2 === arguments.length) for (var n2, i2 = 0, a2 = e3.length; i2 < a2; i2++) !n2 && i2 in e3 || (n2 || (n2 = Array.prototype.slice.call(e3, 0, i2)), n2[i2] = e3[i2]);
            return t3.concat(n2 || Array.prototype.slice.call(e3));
          };
          Object.defineProperty(e2, "__esModule", { value: true }), e2.encode = void 0;
          var i = r2(289), a = r2(535), o = r2(507);
          function s(t3, e3) {
            return { absoluteTime: t3.ticks, channel: e3, controllerType: t3.number, deltaTime: 0, type: "controller", value: Math.floor(127 * t3.value) };
          }
          function c(t3) {
            return { absoluteTime: 0, channel: t3.channel, deltaTime: 0, programNumber: t3.instrument.number, type: "programChange" };
          }
          e2.encode = function(t3) {
            var e3 = { header: { format: 1, numTracks: t3.tracks.length + 1, ticksPerBeat: t3.header.ppq }, tracks: n([n(n(n(n([{ absoluteTime: 0, deltaTime: 0, meta: true, text: t3.header.name, type: "trackName" }], t3.header.keySignatures.map((function(t4) {
              return (function(t5) {
                var e4 = a.keySignatureKeys.indexOf(t5.key);
                return { absoluteTime: t5.ticks, deltaTime: 0, key: e4 + 7, meta: true, scale: "major" === t5.scale ? 0 : 1, type: "keySignature" };
              })(t4);
            })), true), t3.header.meta.map((function(t4) {
              return { absoluteTime: (e4 = t4).ticks, deltaTime: 0, meta: true, text: e4.text, type: e4.type };
              var e4;
            })), true), t3.header.tempos.map((function(t4) {
              return (function(t5) {
                return { absoluteTime: t5.ticks, deltaTime: 0, meta: true, microsecondsPerBeat: Math.floor(6e7 / t5.bpm), type: "setTempo" };
              })(t4);
            })), true), t3.header.timeSignatures.map((function(t4) {
              return (function(t5) {
                return { absoluteTime: t5.ticks, deltaTime: 0, denominator: t5.timeSignature[1], meta: true, metronome: 24, numerator: t5.timeSignature[0], thirtyseconds: 8, type: "timeSignature" };
              })(t4);
            })), true)], t3.tracks.map((function(t4) {
              return n(n(n([(e4 = t4.name, { absoluteTime: 0, deltaTime: 0, meta: true, text: e4, type: "trackName" }), c(t4)], (function(t5) {
                return (0, o.flatten)(t5.notes.map((function(e5) {
                  return (function(t6, e6) {
                    return [{ absoluteTime: t6.ticks, channel: e6, deltaTime: 0, noteNumber: t6.midi, type: "noteOn", velocity: Math.floor(127 * t6.velocity) }, { absoluteTime: t6.ticks + t6.durationTicks, channel: e6, deltaTime: 0, noteNumber: t6.midi, type: "noteOff", velocity: Math.floor(127 * t6.noteOffVelocity) }];
                  })(e5, t5.channel);
                })));
              })(t4), true), (function(t5) {
                for (var e5 = [], r3 = 0; r3 < 127; r3++) t5.controlChanges.hasOwnProperty(r3) && t5.controlChanges[r3].forEach((function(r4) {
                  e5.push(s(r4, t5.channel));
                }));
                return e5;
              })(t4), true), (function(t5) {
                var e5 = [];
                return t5.pitchBends.forEach((function(r3) {
                  e5.push((function(t6, e6) {
                    return { absoluteTime: t6.ticks, channel: e6, deltaTime: 0, type: "pitchBend", value: t6.value };
                  })(r3, t5.channel));
                })), e5;
              })(t4), true);
              var e4;
            })), true) };
            return e3.tracks = e3.tracks.map((function(t4) {
              t4 = t4.sort((function(t5, e5) {
                return t5.absoluteTime - e5.absoluteTime;
              }));
              var e4 = 0;
              return t4.forEach((function(t5) {
                t5.deltaTime = t5.absoluteTime - e4, e4 = t5.absoluteTime, delete t5.absoluteTime;
              })), t4.push({ deltaTime: 0, meta: true, type: "endOfTrack" }), t4;
            })), new Uint8Array((0, i.writeMidi)(e3));
          };
        }, 535: (t2, e2, r2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.Header = e2.keySignatureKeys = void 0;
          var n = r2(805), i = /* @__PURE__ */ new WeakMap();
          e2.keySignatureKeys = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"];
          var a = (function() {
            function t3(t4) {
              var r3 = this;
              if (this.tempos = [], this.timeSignatures = [], this.keySignatures = [], this.meta = [], this.name = "", i.set(this, 480), t4) {
                i.set(this, t4.header.ticksPerBeat), t4.tracks.forEach((function(t5) {
                  t5.forEach((function(t6) {
                    t6.meta && ("timeSignature" === t6.type ? r3.timeSignatures.push({ ticks: t6.absoluteTime, timeSignature: [t6.numerator, t6.denominator] }) : "setTempo" === t6.type ? r3.tempos.push({ bpm: 6e7 / t6.microsecondsPerBeat, ticks: t6.absoluteTime }) : "keySignature" === t6.type && r3.keySignatures.push({ key: e2.keySignatureKeys[t6.key + 7], scale: 0 === t6.scale ? "major" : "minor", ticks: t6.absoluteTime }));
                  }));
                }));
                var n2 = 0;
                t4.tracks[0].forEach((function(t5) {
                  n2 += t5.deltaTime, t5.meta && ("trackName" === t5.type ? r3.name = t5.text : "text" !== t5.type && "cuePoint" !== t5.type && "marker" !== t5.type && "lyrics" !== t5.type || r3.meta.push({ text: t5.text, ticks: n2, type: t5.type }));
                })), this.update();
              }
            }
            return t3.prototype.update = function() {
              var t4 = this, e3 = 0, r3 = 0;
              this.tempos.sort((function(t5, e4) {
                return t5.ticks - e4.ticks;
              })), this.tempos.forEach((function(n2, i2) {
                var a2 = i2 > 0 ? t4.tempos[i2 - 1].bpm : t4.tempos[0].bpm, o = n2.ticks / t4.ppq - r3, s = 60 / a2 * o;
                n2.time = s + e3, e3 = n2.time, r3 += o;
              })), this.timeSignatures.sort((function(t5, e4) {
                return t5.ticks - e4.ticks;
              })), this.timeSignatures.forEach((function(e4, r4) {
                var n2 = r4 > 0 ? t4.timeSignatures[r4 - 1] : t4.timeSignatures[0], i2 = (e4.ticks - n2.ticks) / t4.ppq / n2.timeSignature[0] / (n2.timeSignature[1] / 4);
                n2.measures = n2.measures || 0, e4.measures = i2 + n2.measures;
              }));
            }, t3.prototype.ticksToSeconds = function(t4) {
              var e3 = (0, n.search)(this.tempos, t4);
              if (-1 !== e3) {
                var r3 = this.tempos[e3], i2 = r3.time, a2 = (t4 - r3.ticks) / this.ppq;
                return i2 + 60 / r3.bpm * a2;
              }
              return t4 / this.ppq * 0.5;
            }, t3.prototype.ticksToMeasures = function(t4) {
              var e3 = (0, n.search)(this.timeSignatures, t4);
              if (-1 !== e3) {
                var r3 = this.timeSignatures[e3], i2 = (t4 - r3.ticks) / this.ppq;
                return r3.measures + i2 / (r3.timeSignature[0] / r3.timeSignature[1]) / 4;
              }
              return t4 / this.ppq / 4;
            }, Object.defineProperty(t3.prototype, "ppq", { get: function() {
              return i.get(this);
            }, enumerable: false, configurable: true }), t3.prototype.secondsToTicks = function(t4) {
              var e3 = (0, n.search)(this.tempos, t4, "time");
              if (-1 !== e3) {
                var r3 = this.tempos[e3], i2 = (t4 - r3.time) / (60 / r3.bpm);
                return Math.round(r3.ticks + i2 * this.ppq);
              }
              var a2 = t4 / 0.5;
              return Math.round(a2 * this.ppq);
            }, t3.prototype.toJSON = function() {
              return { keySignatures: this.keySignatures, meta: this.meta, name: this.name, ppq: this.ppq, tempos: this.tempos.map((function(t4) {
                return { bpm: t4.bpm, ticks: t4.ticks };
              })), timeSignatures: this.timeSignatures };
            }, t3.prototype.fromJSON = function(t4) {
              this.name = t4.name, this.tempos = t4.tempos.map((function(t5) {
                return Object.assign({}, t5);
              })), this.timeSignatures = t4.timeSignatures.map((function(t5) {
                return Object.assign({}, t5);
              })), this.keySignatures = t4.keySignatures.map((function(t5) {
                return Object.assign({}, t5);
              })), this.meta = t4.meta.map((function(t5) {
                return Object.assign({}, t5);
              })), i.set(this, t4.ppq), this.update();
            }, t3.prototype.setTempo = function(t4) {
              this.tempos = [{ bpm: t4, ticks: 0 }], this.update();
            }, t3;
          })();
          e2.Header = a;
        }, 362: (t2, e2, r2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.Instrument = void 0;
          var n = r2(438), i = /* @__PURE__ */ new WeakMap(), a = (function() {
            function t3(t4, e3) {
              if (this.number = 0, i.set(this, e3), this.number = 0, t4) {
                var r3 = t4.find((function(t5) {
                  return "programChange" === t5.type;
                }));
                r3 && (this.number = r3.programNumber);
              }
            }
            return Object.defineProperty(t3.prototype, "name", { get: function() {
              return this.percussion ? n.DrumKitByPatchID[this.number] : n.instrumentByPatchID[this.number];
            }, set: function(t4) {
              var e3 = n.instrumentByPatchID.indexOf(t4);
              -1 !== e3 && (this.number = e3);
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "family", { get: function() {
              return this.percussion ? "drums" : n.InstrumentFamilyByID[Math.floor(this.number / 8)];
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "percussion", { get: function() {
              return 9 === i.get(this).channel;
            }, enumerable: false, configurable: true }), t3.prototype.toJSON = function() {
              return { family: this.family, number: this.number, name: this.name };
            }, t3.prototype.fromJSON = function(t4) {
              this.number = t4.number;
            }, t3;
          })();
          e2.Instrument = a;
        }, 438: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.DrumKitByPatchID = e2.InstrumentFamilyByID = e2.instrumentByPatchID = void 0, e2.instrumentByPatchID = ["acoustic grand piano", "bright acoustic piano", "electric grand piano", "honky-tonk piano", "electric piano 1", "electric piano 2", "harpsichord", "clavi", "celesta", "glockenspiel", "music box", "vibraphone", "marimba", "xylophone", "tubular bells", "dulcimer", "drawbar organ", "percussive organ", "rock organ", "church organ", "reed organ", "accordion", "harmonica", "tango accordion", "acoustic guitar (nylon)", "acoustic guitar (steel)", "electric guitar (jazz)", "electric guitar (clean)", "electric guitar (muted)", "overdriven guitar", "distortion guitar", "guitar harmonics", "acoustic bass", "electric bass (finger)", "electric bass (pick)", "fretless bass", "slap bass 1", "slap bass 2", "synth bass 1", "synth bass 2", "violin", "viola", "cello", "contrabass", "tremolo strings", "pizzicato strings", "orchestral harp", "timpani", "string ensemble 1", "string ensemble 2", "synthstrings 1", "synthstrings 2", "choir aahs", "voice oohs", "synth voice", "orchestra hit", "trumpet", "trombone", "tuba", "muted trumpet", "french horn", "brass section", "synthbrass 1", "synthbrass 2", "soprano sax", "alto sax", "tenor sax", "baritone sax", "oboe", "english horn", "bassoon", "clarinet", "piccolo", "flute", "recorder", "pan flute", "blown bottle", "shakuhachi", "whistle", "ocarina", "lead 1 (square)", "lead 2 (sawtooth)", "lead 3 (calliope)", "lead 4 (chiff)", "lead 5 (charang)", "lead 6 (voice)", "lead 7 (fifths)", "lead 8 (bass + lead)", "pad 1 (new age)", "pad 2 (warm)", "pad 3 (polysynth)", "pad 4 (choir)", "pad 5 (bowed)", "pad 6 (metallic)", "pad 7 (halo)", "pad 8 (sweep)", "fx 1 (rain)", "fx 2 (soundtrack)", "fx 3 (crystal)", "fx 4 (atmosphere)", "fx 5 (brightness)", "fx 6 (goblins)", "fx 7 (echoes)", "fx 8 (sci-fi)", "sitar", "banjo", "shamisen", "koto", "kalimba", "bag pipe", "fiddle", "shanai", "tinkle bell", "agogo", "steel drums", "woodblock", "taiko drum", "melodic tom", "synth drum", "reverse cymbal", "guitar fret noise", "breath noise", "seashore", "bird tweet", "telephone ring", "helicopter", "applause", "gunshot"], e2.InstrumentFamilyByID = ["piano", "chromatic percussion", "organ", "guitar", "bass", "strings", "ensemble", "brass", "reed", "pipe", "synth lead", "synth pad", "synth effects", "world", "percussive", "sound effects"], e2.DrumKitByPatchID = { 0: "standard kit", 8: "room kit", 16: "power kit", 24: "electronic kit", 25: "tr-808 kit", 32: "jazz kit", 40: "brush kit", 48: "orchestra kit", 56: "sound fx kit" };
        }, 233: function(t2, e2, r2) {
          "use strict";
          var n = this && this.__awaiter || function(t3, e3, r3, n2) {
            return new (r3 || (r3 = Promise))((function(i2, a2) {
              function o2(t4) {
                try {
                  c2(n2.next(t4));
                } catch (t5) {
                  a2(t5);
                }
              }
              function s2(t4) {
                try {
                  c2(n2.throw(t4));
                } catch (t5) {
                  a2(t5);
                }
              }
              function c2(t4) {
                var e4;
                t4.done ? i2(t4.value) : (e4 = t4.value, e4 instanceof r3 ? e4 : new r3((function(t5) {
                  t5(e4);
                }))).then(o2, s2);
              }
              c2((n2 = n2.apply(t3, e3 || [])).next());
            }));
          }, i = this && this.__generator || function(t3, e3) {
            var r3, n2, i2, a2, o2 = { label: 0, sent: function() {
              if (1 & i2[0]) throw i2[1];
              return i2[1];
            }, trys: [], ops: [] };
            return a2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (a2[Symbol.iterator] = function() {
              return this;
            }), a2;
            function s2(a3) {
              return function(s3) {
                return (function(a4) {
                  if (r3) throw new TypeError("Generator is already executing.");
                  for (; o2; ) try {
                    if (r3 = 1, n2 && (i2 = 2 & a4[0] ? n2.return : a4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, a4[1])).done) return i2;
                    switch (n2 = 0, i2 && (a4 = [2 & a4[0], i2.value]), a4[0]) {
                      case 0:
                      case 1:
                        i2 = a4;
                        break;
                      case 4:
                        return o2.label++, { value: a4[1], done: false };
                      case 5:
                        o2.label++, n2 = a4[1], a4 = [0];
                        continue;
                      case 7:
                        a4 = o2.ops.pop(), o2.trys.pop();
                        continue;
                      default:
                        if (!((i2 = (i2 = o2.trys).length > 0 && i2[i2.length - 1]) || 6 !== a4[0] && 2 !== a4[0])) {
                          o2 = 0;
                          continue;
                        }
                        if (3 === a4[0] && (!i2 || a4[1] > i2[0] && a4[1] < i2[3])) {
                          o2.label = a4[1];
                          break;
                        }
                        if (6 === a4[0] && o2.label < i2[1]) {
                          o2.label = i2[1], i2 = a4;
                          break;
                        }
                        if (i2 && o2.label < i2[2]) {
                          o2.label = i2[2], o2.ops.push(a4);
                          break;
                        }
                        i2[2] && o2.ops.pop(), o2.trys.pop();
                        continue;
                    }
                    a4 = e3.call(t3, o2);
                  } catch (t4) {
                    a4 = [6, t4], n2 = 0;
                  } finally {
                    r3 = i2 = 0;
                  }
                  if (5 & a4[0]) throw a4[1];
                  return { value: a4[0] ? a4[1] : void 0, done: true };
                })([a3, s3]);
              };
            }
          };
          Object.defineProperty(e2, "__esModule", { value: true }), e2.Header = e2.Track = e2.Midi = void 0;
          var a = r2(289), o = r2(535), s = r2(334), c = r2(54), u = (function() {
            function t3(t4) {
              var e3 = this, r3 = null;
              if (t4) {
                var n2 = t4 instanceof ArrayBuffer ? new Uint8Array(t4) : t4;
                (r3 = (0, a.parseMidi)(n2)).tracks.forEach((function(t5) {
                  var e4 = 0;
                  t5.forEach((function(t6) {
                    e4 += t6.deltaTime, t6.absoluteTime = e4;
                  }));
                })), r3.tracks = (function(t5) {
                  for (var e4 = [], r4 = 0; r4 < t5.length; r4++) for (var n3 = e4.length, i2 = /* @__PURE__ */ new Map(), a2 = Array(16).fill(0), o2 = 0, s2 = t5[r4]; o2 < s2.length; o2++) {
                    var c2 = s2[o2], u2 = n3, h2 = c2.channel;
                    if (void 0 !== h2) {
                      "programChange" === c2.type && (a2[h2] = c2.programNumber);
                      var f2 = a2[h2], p = "".concat(f2, " ").concat(h2);
                      i2.has(p) ? u2 = i2.get(p) : (u2 = n3 + i2.size, i2.set(p, u2));
                    }
                    e4[u2] || e4.push([]), e4[u2].push(c2);
                  }
                  return e4;
                })(r3.tracks);
              }
              this.header = new o.Header(r3), this.tracks = [], t4 && (this.tracks = r3.tracks.map((function(t5) {
                return new s.Track(t5, e3.header);
              })), 1 === r3.header.format && 0 === this.tracks[0].duration && this.tracks.shift());
            }
            return t3.fromUrl = function(e3) {
              return n(this, void 0, void 0, (function() {
                var r3;
                return i(this, (function(n2) {
                  switch (n2.label) {
                    case 0:
                      return [4, fetch(e3)];
                    case 1:
                      return (r3 = n2.sent()).ok ? [4, r3.arrayBuffer()] : [3, 3];
                    case 2:
                      return [2, new t3(n2.sent())];
                    case 3:
                      throw new Error("Could not load '".concat(e3, "'"));
                  }
                }));
              }));
            }, Object.defineProperty(t3.prototype, "name", { get: function() {
              return this.header.name;
            }, set: function(t4) {
              this.header.name = t4;
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "duration", { get: function() {
              var t4 = this.tracks.map((function(t5) {
                return t5.duration;
              }));
              return Math.max.apply(Math, t4);
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "durationTicks", { get: function() {
              var t4 = this.tracks.map((function(t5) {
                return t5.durationTicks;
              }));
              return Math.max.apply(Math, t4);
            }, enumerable: false, configurable: true }), t3.prototype.addTrack = function() {
              var t4 = new s.Track(void 0, this.header);
              return this.tracks.push(t4), t4;
            }, t3.prototype.toArray = function() {
              return (0, c.encode)(this);
            }, t3.prototype.toJSON = function() {
              return { header: this.header.toJSON(), tracks: this.tracks.map((function(t4) {
                return t4.toJSON();
              })) };
            }, t3.prototype.fromJSON = function(t4) {
              var e3 = this;
              this.header = new o.Header(), this.header.fromJSON(t4.header), this.tracks = t4.tracks.map((function(t5) {
                var r3 = new s.Track(void 0, e3.header);
                return r3.fromJSON(t5), r3;
              }));
            }, t3.prototype.clone = function() {
              var e3 = new t3();
              return e3.fromJSON(this.toJSON()), e3;
            }, t3;
          })();
          e2.Midi = u;
          var h = r2(334);
          Object.defineProperty(e2, "Track", { enumerable: true, get: function() {
            return h.Track;
          } });
          var f = r2(535);
          Object.defineProperty(e2, "Header", { enumerable: true, get: function() {
            return f.Header;
          } });
        }, 518: (t2, e2) => {
          "use strict";
          function r2(t3) {
            return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][t3 % 12];
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.Note = void 0;
          var n, i, a = (n = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i, i = { cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2, dbb: 0, db: 1, d: 2, "d#": 3, dx: 4, ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6, fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7, gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9, abb: 7, ab: 8, a: 9, "a#": 10, ax: 11, bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13 }, function(t3) {
            var e3 = n.exec(t3), r3 = e3[1], a2 = e3[2];
            return i[r3.toLowerCase()] + 12 * (parseInt(a2, 10) + 1);
          }), o = /* @__PURE__ */ new WeakMap(), s = (function() {
            function t3(t4, e3, r3) {
              o.set(this, r3), this.midi = t4.midi, this.velocity = t4.velocity, this.noteOffVelocity = e3.velocity, this.ticks = t4.ticks, this.durationTicks = e3.ticks - t4.ticks;
            }
            return Object.defineProperty(t3.prototype, "name", { get: function() {
              return t4 = this.midi, e3 = Math.floor(t4 / 12) - 1, r2(t4) + e3.toString();
              var t4, e3;
            }, set: function(t4) {
              this.midi = a(t4);
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "octave", { get: function() {
              return Math.floor(this.midi / 12) - 1;
            }, set: function(t4) {
              var e3 = t4 - this.octave;
              this.midi += 12 * e3;
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "pitch", { get: function() {
              return r2(this.midi);
            }, set: function(t4) {
              this.midi = 12 * (this.octave + 1) + ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(t4);
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "duration", { get: function() {
              var t4 = o.get(this);
              return t4.ticksToSeconds(this.ticks + this.durationTicks) - t4.ticksToSeconds(this.ticks);
            }, set: function(t4) {
              var e3 = o.get(this).secondsToTicks(this.time + t4);
              this.durationTicks = e3 - this.ticks;
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "time", { get: function() {
              return o.get(this).ticksToSeconds(this.ticks);
            }, set: function(t4) {
              var e3 = o.get(this);
              this.ticks = e3.secondsToTicks(t4);
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "bars", { get: function() {
              return o.get(this).ticksToMeasures(this.ticks);
            }, enumerable: false, configurable: true }), t3.prototype.toJSON = function() {
              return { duration: this.duration, durationTicks: this.durationTicks, midi: this.midi, name: this.name, ticks: this.ticks, time: this.time, velocity: this.velocity };
            }, t3;
          })();
          e2.Note = s;
        }, 882: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.PitchBend = void 0;
          var r2 = /* @__PURE__ */ new WeakMap(), n = (function() {
            function t3(t4, e3) {
              r2.set(this, e3), this.ticks = t4.absoluteTime, this.value = t4.value;
            }
            return Object.defineProperty(t3.prototype, "time", { get: function() {
              return r2.get(this).ticksToSeconds(this.ticks);
            }, set: function(t4) {
              var e3 = r2.get(this);
              this.ticks = e3.secondsToTicks(t4);
            }, enumerable: false, configurable: true }), t3.prototype.toJSON = function() {
              return { ticks: this.ticks, time: this.time, value: this.value };
            }, t3;
          })();
          e2.PitchBend = n;
        }, 334: (t2, e2, r2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.Track = void 0;
          var n = r2(805), i = r2(543), a = r2(906), o = r2(882), s = r2(362), c = r2(518), u = /* @__PURE__ */ new WeakMap(), h = (function() {
            function t3(t4, e3) {
              var r3 = this;
              if (this.name = "", this.notes = [], this.controlChanges = (0, a.createControlChanges)(), this.pitchBends = [], u.set(this, e3), t4) {
                var n2 = t4.find((function(t5) {
                  return "trackName" === t5.type;
                }));
                this.name = n2 ? n2.text : "";
              }
              if (this.instrument = new s.Instrument(t4, this), this.channel = 0, t4) {
                for (var i2 = t4.filter((function(t5) {
                  return "noteOn" === t5.type;
                })), o2 = t4.filter((function(t5) {
                  return "noteOff" === t5.type;
                })), c2 = function() {
                  var t5 = i2.shift();
                  h2.channel = t5.channel;
                  var e4 = o2.findIndex((function(e5) {
                    return e5.noteNumber === t5.noteNumber && e5.absoluteTime >= t5.absoluteTime;
                  }));
                  if (-1 !== e4) {
                    var r4 = o2.splice(e4, 1)[0];
                    h2.addNote({ durationTicks: r4.absoluteTime - t5.absoluteTime, midi: t5.noteNumber, noteOffVelocity: r4.velocity / 127, ticks: t5.absoluteTime, velocity: t5.velocity / 127 });
                  }
                }, h2 = this; i2.length; ) c2();
                t4.filter((function(t5) {
                  return "controller" === t5.type;
                })).forEach((function(t5) {
                  r3.addCC({ number: t5.controllerType, ticks: t5.absoluteTime, value: t5.value / 127 });
                })), t4.filter((function(t5) {
                  return "pitchBend" === t5.type;
                })).forEach((function(t5) {
                  r3.addPitchBend({ ticks: t5.absoluteTime, value: t5.value / Math.pow(2, 13) });
                }));
                var f = t4.find((function(t5) {
                  return "endOfTrack" === t5.type;
                }));
                this.endOfTrackTicks = void 0 !== f ? f.absoluteTime : void 0;
              }
            }
            return t3.prototype.addNote = function(t4) {
              var e3 = u.get(this), r3 = new c.Note({ midi: 0, ticks: 0, velocity: 1 }, { ticks: 0, velocity: 0 }, e3);
              return Object.assign(r3, t4), (0, n.insert)(this.notes, r3, "ticks"), this;
            }, t3.prototype.addCC = function(t4) {
              var e3 = u.get(this), r3 = new i.ControlChange({ controllerType: t4.number }, e3);
              return delete t4.number, Object.assign(r3, t4), Array.isArray(this.controlChanges[r3.number]) || (this.controlChanges[r3.number] = []), (0, n.insert)(this.controlChanges[r3.number], r3, "ticks"), this;
            }, t3.prototype.addPitchBend = function(t4) {
              var e3 = u.get(this), r3 = new o.PitchBend({}, e3);
              return Object.assign(r3, t4), (0, n.insert)(this.pitchBends, r3, "ticks"), this;
            }, Object.defineProperty(t3.prototype, "duration", { get: function() {
              if (!this.notes.length) return 0;
              for (var t4 = this.notes[this.notes.length - 1].time + this.notes[this.notes.length - 1].duration, e3 = 0; e3 < this.notes.length - 1; e3++) {
                var r3 = this.notes[e3].time + this.notes[e3].duration;
                t4 < r3 && (t4 = r3);
              }
              return t4;
            }, enumerable: false, configurable: true }), Object.defineProperty(t3.prototype, "durationTicks", { get: function() {
              if (!this.notes.length) return 0;
              for (var t4 = this.notes[this.notes.length - 1].ticks + this.notes[this.notes.length - 1].durationTicks, e3 = 0; e3 < this.notes.length - 1; e3++) {
                var r3 = this.notes[e3].ticks + this.notes[e3].durationTicks;
                t4 < r3 && (t4 = r3);
              }
              return t4;
            }, enumerable: false, configurable: true }), t3.prototype.fromJSON = function(t4) {
              var e3 = this;
              for (var r3 in this.name = t4.name, this.channel = t4.channel, this.instrument = new s.Instrument(void 0, this), this.instrument.fromJSON(t4.instrument), void 0 !== t4.endOfTrackTicks && (this.endOfTrackTicks = t4.endOfTrackTicks), t4.controlChanges) t4.controlChanges[r3] && t4.controlChanges[r3].forEach((function(t5) {
                e3.addCC({ number: t5.number, ticks: t5.ticks, value: t5.value });
              }));
              t4.notes.forEach((function(t5) {
                e3.addNote({ durationTicks: t5.durationTicks, midi: t5.midi, ticks: t5.ticks, velocity: t5.velocity });
              }));
            }, t3.prototype.toJSON = function() {
              for (var t4 = {}, e3 = 0; e3 < 127; e3++) this.controlChanges.hasOwnProperty(e3) && (t4[e3] = this.controlChanges[e3].map((function(t5) {
                return t5.toJSON();
              })));
              var r3 = { channel: this.channel, controlChanges: t4, pitchBends: this.pitchBends.map((function(t5) {
                return t5.toJSON();
              })), instrument: this.instrument.toJSON(), name: this.name, notes: this.notes.map((function(t5) {
                return t5.toJSON();
              })) };
              return void 0 !== this.endOfTrackTicks && (r3.endOfTrackTicks = this.endOfTrackTicks), r3;
            }, t3;
          })();
          e2.Track = h;
        } }, e = {};
        function r(n) {
          var i = e[n];
          if (void 0 !== i) return i.exports;
          var a = e[n] = { exports: {} };
          return t[n].call(a.exports, a, a.exports, r), a.exports;
        }
        return r.d = (t2, e2) => {
          for (var n in e2) r.o(e2, n) && !r.o(t2, n) && Object.defineProperty(t2, n, { enumerable: true, get: e2[n] });
        }, r.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r.r = (t2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, r(233);
      })();
    }));
  }
});
export default require_Midi();
