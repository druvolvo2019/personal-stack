#! /bin/sh

stage=$1
sitename=cims-$stage

zipfile=deploy-cims-$stage.zip
currentFolder=`date +%Y-%m-%d`
sitedatapath=site-data/$sitename
quasarFoldername=pwa

echo zipfile $zipfile
echo currentFolder $currentFolder
echo sitedatapath $sitedatapath
echo quasarFoldername $quasarFoldername

mkdir -p $sitedatapath
mv $zipfile $sitedatapath/$zipfile
cd $sitedatapath

echo Current working directory $( pwd )

if [ ! -f $zipfile ];
then
    echo $zipfile is not available!
    exit 1
fi

if [ -e $quasarFoldername ];
then
    echo Removing existing $quasarFoldername
    rm -R $quasarFoldername
fi

unzip $zipfile

if [ -e "$currentFolder" ];
then
    echo Removing existing $currentFolder
    rm -R $currentFolder
fi

mv $quasarFoldername $currentFolder
chmod a+r -R $currentFolder

cd /home/ubuntu
echo Current working directory $( pwd )
ls
echo Testing existence of $sitename

if [ -e "website/$sitename" ];
then
echo Removing existing link to website/$sitename
rm website/$sitename
echo Existing link to website/$sitename removed
fi

echo Linking ln -s $(pwd)/$sitedatapath/$currentFolder website/$sitename
ln -s $(pwd)/$sitedatapath/$currentFolder website/$sitename
echo Deployment finished