require 'auto-correct'

root = './source/_posts'

Dir.open(root).each do |dir|
  next if File.directory?("#{root}/#{dir}")
  content = File.open("#{root}/#{dir}").read

  p = AutoCorrect.format(content)

  afile = File.open("#{root}/#{dir}", 'w+')
  afile.syswrite p
  afile.close
end
